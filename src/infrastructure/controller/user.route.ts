import { Router } from 'express';
import { UserService } from '../../application/service/user/user.service';
import { User } from '../../model/domain';
import { verifyAuth } from '../middleware/auth/jwt.auth';

export const userRoute = (router: Router, userService: UserService) => {

  router.get('/user', verifyAuth, (req, res, next) => {
    const user = req.body.user as User;

    userService.get(user.id).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      next(error);
    });
  });

  router.post('/user', (req, res, next) => {
    const id = '';//TODO obtain user user by token
    if (!id) {
      res.status(404).json({ code: 404, message: 'user not found' });
      return;
    }
    const user = req.body as User;

    userService.post(user).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      next(error);
    });
  });

  router.put('/user', (req, res, next) => {
    //TODO
    next();
  });

  router.delete('/user', (req, res, next) => {
    const id = '';//TODO obtain user user by token
    if (!id) {
      res.status(404).json({ code: 404, message: 'user not found' });
      return;
    }


    userService.delete(id).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      next(error);
    });
  });
};
