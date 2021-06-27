import { Router } from "express";
import { RouteService } from "../../application/service";

export const routeRoute = (router: Router, routeService: RouteService) => {
  router.get("/routes", (req, res) => {
    const difficult = req.query.difficult;
    const duration = req.query.duration;

    if (difficult || duration) {
      if (!difficult || !duration) {
        res.status(400).json({ code: 400, mesage: "Invalid query." });

        return;
      }
      routeService.getRoutes({ difficult, duration }).then(response => {
        res.status(200).json(response)
      }).catch(error => {
        res.status(error.code).json(error);
      });

      return;
    }

    routeService.getRoutes().then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  });

  router.get("/routes/:id", (req, res, next) => {
    const id = req.params.id;
    routeService.getRoute(id).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({
          code: 404,
          message: `Route with id: ${ id } Not found in database.`
        });

        return;
      }
      console.error(error.kind)
      next(error)
    });
  });

  //TODO Handle JWT token.
  router.post("/routes", (req, res) => {
    const route = req.body;
    routeService.postRoute(route).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  });

  //TODO Handle JWT token.
  router.put("/routes/:id", (req, res, next) => {
    const route = req.body;
    const id = req.params.id;

    routeService.putRoute(id, route).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      if (error.code === 404) {
        res.status(404).json({
          code: 404,
          message: `Route with id: ${ id } Not found in database.`
        });

        return;
      }
      console.error(error.kind)
      next(error);
    });
  });

  //TODO Handle JWT token.
  router.delete("/routes/:id", (req, res, next) => {
    const id = req.params.id;
    routeService.deleteRoute(id).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      console.error(error.kind)
      next(error)
    });
  })

}