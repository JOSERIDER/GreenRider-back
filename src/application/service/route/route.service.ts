import { RouteRepositoryInterface, RouteDomain } from "../../../model/domain";

export class RouteService{

  constructor(private routeRepository: RouteRepositoryInterface) {
  }

  getRoute(id: string): Promise<RouteDomain> {
    return this.routeRepository.getRoute(id);
  }

  getRoutes(): Promise<RouteDomain[]> {
    return this.routeRepository.getRoutes();
  }

  postRoute(route: RouteDomain): Promise<RouteDomain> {
    return  this.routeRepository.createRoute(route);
  }

  putRoute(route: RouteDomain): Promise<RouteDomain> {
    return  this.routeRepository.updateRoute(route);
  }

  deleteRoute(id: string): Promise<void> {
    return  this.routeRepository.deleteRoute(id);
  }
}
