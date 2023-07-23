const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenActions = require("../../utils/TokenActions");
const salt = bcrypt.genSaltSync(10);
const userPatten = {
  name: "",
  email: "",
  password: "",
  folllows: [],
  likes: [],
  collections: [],
  urlAvt: "https://firebasestorage.googleapis.com/v0/b/dribbledb.appspot.com/o/files%2Favatar-default-e370af14535cdbf137637a27ee1a8e451253edc80be429050bc29d59b1f7cda0.gif?alt=media&token=d88b66ee-9662-44b6-a36a-e0543e70a4c0",
  urlBanner: "",
  introdution: "",
  bio: "Người dùng này chưa thêm tiểu sử 🙁",
  address: "",
  skills: "",
  socialNetworks: [
    {
      link: "",
      social: 0,
    },
    {
      link: "",
      social: 1,
    },
    {
      link: "",
      social: 2,
    },
    {
      link: "",
      social: 3,
    },
    {
      link: "",
      social: 4,
    },
    {
      link: "",
      social: 5,
    },
  ],
  availability: 0,
  findwork: false,
  report: 0,
  role: 0,
};

let refreshTokenList = [];

class AuthController {
  // [POST] /api/v1/signin
  async signIn(req, res) {
    try {
      let data = req.body;
      let isValid = false;
      let user = await User.findOne({ email: data.email });
      user = user.toObject();
      if (user) {
        isValid = bcrypt.compareSync(req.body.password, user.password);
        if (isValid) {
          const accessToKen = TokenActions.generateAccessToken({
            id: user._id,
            email: user.email,
            role: user.role,
          });
          const refreshToken = TokenActions.generateRefreshToken({
            id: user._id,
            email: user.email,
            role: user.role,
          });
          // Xử lí
          refreshTokenList.push(refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          delete user.password;
          user.accessToKen = accessToKen;
          res.status(200).json(user);
        } else res.status(400).json("Wrong email or password");
      } else {
        res.status(400).json("Wrong email or password");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // [POST] /api/v1/signup
  async signUp(req, res) {
    try {
      let data = req.body;
      let user = await User.findOne({ email: data.email });
      let isEmailExist = user !== null;
      if (!isEmailExist) {
        data.password = bcrypt.hashSync(data.password, salt);
        data = Object.assign({}, userPatten, data);
        const newData = new User(data);
        newData.save();
        setTimeout(() => {
          res.status(200).json({
            message: "Your account was created!",
          });
        }, 3000);
      } else {
        res.status(400).json({
          message: "Your email was used!",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // [GET] /api/v1/refesh
  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    if (!refreshTokenList.includes(refreshToken))
      return res.status(403).json("Refresh token is not valid");
    jwt.verify(refreshToken, process.env.REFESH_SERECT_KEY, (err, data) => {
      if (err) {
        console.log(err);
      }
      refreshTokenList = refreshTokenList.filter(
        (token) => token !== refreshToken
      );
      const newAccessToKen = TokenActions.generateAccessToken({
        id: data._id,
        email: data.email,
        role: data.role,
      });

      const newRefreshToken = TokenActions.generateRefreshToken({
        id: data._id,
        email: data.email,
        role: data.role,
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToKen: newAccessToKen });
    });
  }
  // [GET] /api/v1/logout
  async logout(req, res) {
    refreshTokenList = refreshTokenList.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  }
}

module.exports = new AuthController();
