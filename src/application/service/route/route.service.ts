import { RouteRepositoryInterface, Route } from "../../../model/domain";

export class RouteService{

  constructor(private routeRepository: RouteRepositoryInterface) {
  }

  getRoute(id: string): Promise<Route> {
    return this.routeRepository.getRoute(id);
  }

  getRoutes(): Promise<Route[]> {
    return this.routeRepository.getRoutes();
  }

  postRoute(route: Route): Promise<Route> {
    return  this.routeRepository.createRoute(route);
  }

  putRoute(route: Route): Promise<Route> {
    return  this.routeRepository.updateRoute(route);
  }

  deleteRoute(id: string): Promise<void> {
    return  this.routeRepository.deleteRoute(id);
  }
}
