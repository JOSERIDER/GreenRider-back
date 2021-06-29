const jwt = require('jsonwebtoken');

export const verifyAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    return next({ status: 401, message: 'authorization missing' });
  }
  jwt.verify(authHeader, '', (err: any, user: any) => {
    if (err) {
      return next({ status: 403, message: err.message });
    }
    req.body.user = user;
    next();
  });
};

export const authJwt = (req:any, res:any, next: any) => {
  
}
