import { Router } from 'express';
import { CommentService } from '../../application/service';
import verifyAuth from '../middleware/auth/jwt.auth';

export const commentRoute = (router: Router, commentService: CommentService) => {

  router.post('/comments', verifyAuth, (req, res, next) => {
    const comment = req.body;

    commentService.post(comment).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      console.error(error);
      next(error);
    });
  });

  router.delete('/comments/:routeId/:commentId', verifyAuth, (req, res, next) => {
    const { routeId, commentId } = req.params;

    commentService.delete(routeId, commentId).then(() => {
      res.status(200).send();
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({ code: 404, message: `Route with id ${ routeId } not found` });

        return;
      }
      console.error(error);
      next(error);
    });
  });
};
