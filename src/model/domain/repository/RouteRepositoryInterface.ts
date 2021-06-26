import { Route } from "../entity";

export interface RouteRepositoryInterface {
  getRoute(id: string): Promise<Route>;

  getRoutes(): Promise<Route[]>;

  createRoute(route: Route): Promise<Route>;

  updateRoute(route: Route): Promise<Route>;

  deleteRoute(id: string): Promise<void>;
}
