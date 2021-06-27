import { RouteDomain, RouteRepositoryInterface } from "../../../model/domain";

export class RouteService {

  constructor(private routeRepository: RouteRepositoryInterface) {
  }

  getRoute(id: string): Promise<RouteDomain> {
    return this.routeRepository.getRoute(id);
  }

  getRoutes(filter?: any): Promise<RouteDomain[]> {
    if (filter) {
      return this.routeRepository.getFilterRoutes(filter);
    }
    return this.routeRepository.getRoutes();
  }

  postRoute(route: RouteDomain): Promise<RouteDomain> {
    return this.routeRepository.createRoute(route);
  }

  putRoute(id: string, route: RouteDomain): Promise<RouteDomain> {
    return this.routeRepository.updateRoute(id, route);
  }

  deleteRoute(id: string): Promise<void> {
    return this.routeRepository.deleteRoute(id);
  }
}
