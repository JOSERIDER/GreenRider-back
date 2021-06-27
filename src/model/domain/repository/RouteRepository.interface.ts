import { RouteDomain } from "../entity";

export interface RouteRepositoryInterface {
  getRoute(id: string): Promise<RouteDomain>;

  getRoutes(): Promise<RouteDomain[]>;

  createRoute(route: RouteDomain): Promise<RouteDomain>;

  updateRoute(route: RouteDomain): Promise<RouteDomain>;

  deleteRoute(id: string): Promise<void>;
}
