import { Router } from 'express';
import { UserService } from '../../application/service';
import verifyAuth from '../middleware/auth/jwt.auth';

export const userRoute = (router: Router, userService: UserService) => {

  router.get('/user', verifyAuth, (req, res) => {
    // @ts-ignore
    const { user } = req;
    res.status(200).json(user);
  });

  router.put('/user', (req, res) => {
    //TODO
    res.sendStatus(503);
  });

  router.delete('/user',verifyAuth, (req, res, next) => {
    // @ts-ignore
    const { id } = req.user;
    userService.delete(id).then(() => {
      res.sendStatus(200)
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({ code: 404, message: 'user not found' });
        return;
      }
      next(error)
    });



    userService.delete(id).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      next(error);
    });
  });
};
