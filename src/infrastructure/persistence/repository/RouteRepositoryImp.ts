import { RouteDomain, RouteRepositoryInterface } from "../../../model/domain";
import RouteSchema from "../../shema/route.schema";
export class RouteRepositoryImp implements RouteRepositoryInterface{

  //TODO constructor must receive mongo connection
  constructor() {
  }

  createRoute(route: RouteDomain): Promise<RouteDomain> {
    const newRoute = new RouteSchema({ ...route });

    return new Promise((resolve, reject) => {
      newRoute.save().then((response: RouteDomain) => {
          resolve(response);
      }).catch(reject);
    })
  }

  deleteRoute(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getRoute(id: string): Promise<RouteDomain> {
    return Promise.resolve({ undefined });
  }

  getRoutes(): Promise<RouteDomain[]> {
    return Promise.resolve([]);
  }

  updateRoute(route: RouteDomain): Promise<RouteDomain> {
    return Promise.resolve({ undefined });
  }

}