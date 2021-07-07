import { Router } from 'express';
import { RouteService } from '../../application/service';
import verifyAuth from '../middleware/auth/jwt.auth';

export const routeRoute = (router: Router, routeService: RouteService) => {
  router.get('/routes', (req, res, next) => {
    const difficult = req.query.difficult;
    const duration = req.query.duration;

    if (difficult || duration) {
      if (!difficult || !duration) {
        res.status(400).json({ code: 400, message: 'Invalid query.' });

        return;
      }
      routeService.getRoutes({ difficult, duration }).then(response => {
        res.status(200).json(response);
      }).catch(error => {
       next(error);
      });

      return;
    }

    routeService.getRoutes().then(response => {
      res.status(200).json(response);
    }).catch(error => {
      next(error)
    });
  });

  router.get('/routes/:id', (req, res, next) => {
    const id = req.params.id;
    routeService.getRoute(id).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({
          code: 404,
          message: `Route with id: ${ id } Not found in database.`,
        });

        return;
      }
      console.error(error.kind);
      next(error);
    });
  });

  router.post('/routes', verifyAuth, (req, res, next) => {
    const route = req.body;
    routeService.postRoute(route).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      next(error);
    });
  });

  router.put('/routes/:id', verifyAuth, (req, res, next) => {
    const route = req.body;
    const id = req.params.id;

    routeService.putRoute(id, route).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({
          code: 404,
          message: `Route with id: ${ id } Not found in database.`,
        });

        return;
      }
      console.error(error.kind);
      next(error);
    });
  });

  router.delete('/routes/:id', verifyAuth, (req, res, next) => {
    const id = req.params.id;
    routeService.deleteRoute(id).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      console.error(error.kind);
      next(error);
    });
  });

};