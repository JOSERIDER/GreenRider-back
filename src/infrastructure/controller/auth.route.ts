import { Router } from 'express';
import { AuthService } from '../../application/service';
import { User } from '../../model/domain';
import verifyAuth from '../middleware/auth/jwt.auth';

export const authRoute = (router: Router, authService: AuthService) => {
  router.post('/auth/login', (req, res) => {
    const { body } = req;
    if (!body.email || !body.password) {
      res.status(401).json({ code: 403, message: 'Invalid params.' });
      return;
    }

    const { email, password } = body;
    authService.login(email, password).then(token => {
      res.status(201).json({ token });
    }).catch(error => {
      if (error.code === 401 || error.code === 404) {
        res.status(401).json({ code: 401, message: 'Email or password incorrect' });
      }
    });
  });


  router.post('/auth/register', (req, res) => {
    const user  = req.body;

    if (!user.email || !user.password || !user.name) {
      res.status(401).send({ code: 403, message: 'Invalid params.' });
      return;
    }
    const newUser = {
      passwordHash: user.password,
      ...user,
    } as User;
    authService.register(newUser).then(token => {
      res.status(201).json({ token });
    }).catch(error => {
      if (error.code === 401) {
        res.status(401).json({ code: 401, message: 'User with this email already exists' });
      }
    });
  });

  router.get('/auth/logout', verifyAuth, (req, res) => {
    res.sendStatus(202);
  });
};