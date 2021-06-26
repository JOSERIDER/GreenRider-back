/**
 * Instantiate the repositories
 */
import { RouteRepositoryInterface } from "../../model/domain";
import { RouteRepositoryImp } from "../persistence/repository/RouteRepositoryImp";
import { RouteService } from "../../application/service";
import { Router } from "express";
import { routeRoute } from "./route.route";

export class Route {

  private readonly r: Router = Router();

  constructor() {
    //Instantiate repositories
    const routeRepository: RouteRepositoryInterface = new RouteRepositoryImp();

    const routeService: RouteService = new RouteService(routeRepository);

    const route = Router();
    routeRoute(route, routeService);

    this.r.use("/api", route);
    this.control();
  }

  public getRouter(): Router {
    return this.r;
  }

  private control(): void {
    this.r.get('/health', (req, res) => {
      res.status(200).json({ status: true })
    });

    this.r.use('*', (req, res) =>
      res.status(404).send()
    );
  }

}