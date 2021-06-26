import { Router } from "express";
import { RouteService } from "../../application/service";
import { Route } from "../../model/domain";

//TODO FILTER ROUTES.
export const routeRoute = (router: Router, routeService: RouteService) => {
  router.get("/routes", (req, res) => {
    routeService.getRoutes().then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  });

  router.get("/route/:id", (req, res) => {
    const id = req.params.id;
    routeService.getRoute(id).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  });

  //TODO Handle JWT token.
  router.post("/route", (req, res) => {
    const route = req.body as Route;
    routeService.postRoute(route).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  });

  //TODO Handle JWT token.
  router.put("/route", (req, res) => {
    const route = req.body as Route;
    routeService.putRoute(route).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  });

  router.delete("/route/:id", (req, res) => {
    const id = req.params.id;
    routeService.deleteRoute(id).then(response => {
      res.status(200).json(response)
    }).catch(error => {
      res.status(error.code).json(error);
    });
  })

}