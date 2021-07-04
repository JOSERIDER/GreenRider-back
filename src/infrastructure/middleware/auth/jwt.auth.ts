import express from 'express';

const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyAuth = router.use((req, res, next) => {
  const authHeader = req.header('authorization');
  if (authHeader == null) {
    return next({ kind: 'JsonWebTokenError' });
  }
  jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return next({ kind: 'TokenExpirerError' });
    }
    // @ts-ignore
    req.user = { email: user.email, id: user.id, name: user.name };
    next();
  });
});

export default verifyAuth;
