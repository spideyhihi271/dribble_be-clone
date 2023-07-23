const jwt = require("jsonwebtoken");

class TokenMiddleWare {
  veryfyToken(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      const accessToKen = token.split(' ')[1];
      jwt.verify(accessToKen, process.env.ACCESS_SERECT_KEY, (err, data) => {
        if (err) {
          return res.status(403).json('Token is not valid');
        }
        req.user = data; 
        next();
      })
    } else {
      return res.status(401).json('You are not authenticated!');
    }
  }
}

module.exports = new TokenMiddleWare();