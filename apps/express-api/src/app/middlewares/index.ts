import * as jwt from "jsonwebtoken";

const JWT_SECRET = 'q1w2e3';

const isLoggedIn = async (req, res, next) => {
  const cookies = req.cookies;
  if (typeof cookies['secureCookie'] !== 'undefined') {
    const {token} = JSON.parse(cookies['secureCookie']);
    const isVerified = jwt.verify(token, JWT_SECRET);
    if (!isVerified) {
      return res.status(403).json({
        message: 'Not authorized'
      });
    }
  }
  await next();
}

export default isLoggedIn;
