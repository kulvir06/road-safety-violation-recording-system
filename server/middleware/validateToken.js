import jwt from 'jsonwebtoken';
import authKey from '../config/authKey';

// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, authKey.secret);
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;