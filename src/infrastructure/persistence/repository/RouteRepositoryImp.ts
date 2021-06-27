import { RouteDomain, RouteRepositoryInterface } from "../../../model/domain";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { MongooseInterface } from "../mongoose/Mongoose.interface";

export class RouteRepositoryImp implements RouteRepositoryInterface {

  constructor(private routeSchema: Model<any>, private mongooseInterface: MongooseInterface) {
  }

  createRoute(route: RouteDomain): Promise<RouteDomain> {
    return new Promise((resolve, reject) => {
      console.log(route)
      this.routeSchema.create({ ...route }).then((response: RouteDomain) => {
        resolve(response);
        this.mongooseInterface.closeConnection();
      }).catch(reject);
    });
  }

  deleteRoute(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.routeSchema.findByIdAndRemove(id).then(() => {
        resolve();
        RouteRepositoryImp.closeConnection()
      }).catch(error => reject(error));
    });
  }

  getRoute(id: string): Promise<RouteDomain> {
    return new Promise((resolve, reject) => {
      this.routeSchema.findById(id).then(response => {
        if (!response) {
          reject({ code: 404 });
          return;
        }
        resolve(response);
        RouteRepositoryImp.closeConnection();
      }).catch(reject);
    });
  }

  getRoutes(): Promise<RouteDomain[]> {
    return new Promise((resolve, reject) => {
      this.routeSchema.find().then(response => {
        resolve(response);
        RouteRepositoryImp.closeConnection();
      }).catch(reject);
    });
  }

  getFilterRoutes(filter: any): Promise<RouteDomain[]> {
    return new Promise((resolve, reject) => {
      this.routeSchema.find({ difficult: filter.difficult, duration: filter.duration }).then(response => {
        resolve(response);
        RouteRepositoryImp.closeConnection();
      }).catch(error => {
        reject(error)
      });
    });
  }

  updateRoute(id: string, route: RouteDomain): Promise<RouteDomain> {
    return new Promise((resolve, reject) => {
      this.routeSchema.findByIdAndUpdate(id, route, { returnOriginal: false }).then(response => {
        if (!response) {
          reject({ code: 404 });
          return;
        }
        resolve(response);
        RouteRepositoryImp.closeConnection();
      }).catch(error => {
        reject(error)
      });
    });
  }

  private static closeConnection() {
    void mongoose.connection.close();
  }
}
