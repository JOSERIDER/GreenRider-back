import express, { Express } from "express";
import { setMiddlewareExpress } from "./middleware/express";
import { Route } from "./controller/route.main";
import { MongooseInterface } from "./persistence/mongoose/Mongoose.interface";
import { Mongoose } from "./persistence/mongoose/Mongoose";

export class App {
  public exp: Express;
  public mongoose: MongooseInterface;

  constructor() {
    App.init();
    this.mongoose = new Mongoose();
    this.exp = express();
    this.config();
    this.exp.use(new Route(this.mongoose).getRouter())
  }

  public async listen(): Promise<boolean> {
    return await new Promise<boolean>((resolve) => {
      this.exp.listen(process.env.API_PORT, () => {
        console.info(`App is working on http://localhost:${ process.env.API_PORT }`);
        console.info(`HOST ${ process.env.API_HOST }`);
        resolve(true);
      });
    });
  }

  private static init() {
    require('dotenv').config();
  }

  private config(): void {
    setMiddlewareExpress(this.exp);
  }
}
