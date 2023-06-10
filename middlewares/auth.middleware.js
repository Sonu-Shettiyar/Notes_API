
require("dotenv").config();
const jwt  = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
    if (token) {
        const decoded = jwt.verify(token, process.env.secret_key);
        req.body.userId = decoded.userId;
        req.body.userName = decoded.userName;
        next();
    } else {
        res.status(200).json({"error":"Not Authorized"})
    }
  } catch (error) {
    res.status(400).json({error})
  }

}
module.exports = {
    auth
}