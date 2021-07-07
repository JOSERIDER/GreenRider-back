import { Router } from 'express';
import { CommentService } from '../../application/service';
import verifyAuth from '../middleware/auth/jwt.auth';

export const commentRoute = (router: Router, commentService: CommentService) => {

  router.get('/comments', (req, res, next) => {
    commentService.getComments().then(response => {
      res.status(200).json(response);
    }).catch(error => {
      console.error(error);
      next(error);
    });
  });

  router.get('/comments/:id', (req, res, next) => {
    const id = req.params.id;

    commentService.getComment(id).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({ code: 404, message: `Comment with id ${ id } not found` });

        return;
      }
      console.error(error);
      next(error);
    });
  });

  router.post('/comments', verifyAuth, (req, res, next) => {
    const comment = req.body;

    commentService.post(comment).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      console.error(error);
      next(error);
    });
  });

  router.delete('/comments/:id', verifyAuth, (req, res, next) => {
    const id = req.params.id;

    commentService.delete(id).then(() => {
      res.status(200).send();
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({ code: 404, message: `Comment with id ${ id } not found` });

        return;
      }
      console.error(error);
      next(error);
    });
  });
};
