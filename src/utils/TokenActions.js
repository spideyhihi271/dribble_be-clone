const jwt = require("jsonwebtoken");
class Token {
  generateAccessToken(data) {
    return jwt.sign(data, process.env.ACCESS_SERECT_KEY, { expiresIn: "2h" });
  }
  generateRefreshToken(data) {
    return jwt.sign(data, process.env.REFESH_SERECT_KEY, { expiresIn: "7d" });
  }
}

module.exports = new Token();
