import { Route, RouteRepositoryInterface } from "../../../model/domain";

export class RouteRepositoryImp implements RouteRepositoryInterface{


  createRoute(route: Route): Promise<Route> {
    return Promise.resolve({  });
  }

  deleteRoute(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getRoute(id: string): Promise<Route> {
    return Promise.resolve({ undefined });
  }

  getRoutes(): Promise<Route[]> {
    return Promise.resolve([]);
  }

  updateRoute(route: Route): Promise<Route> {
    return Promise.resolve({ undefined });
  }

}