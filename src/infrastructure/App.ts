import express, { Express } from "express";
import { setMiddlewareExpress } from "./middleware/express";
import { Route } from "./controller/route.main";

export class App {
  public exp: Express;

  constructor() {
    App.init();
    this.exp = express();
    this.exp.use(new Route().getRouter())
    this.config();
  }

  public async listen(): Promise<boolean> {

    return await new Promise<boolean>((resolve) => {
      this.exp.listen(process.env.API_PORT, () => {
        console.info(`App is working on http://localhost:${process.env.API_PORT}`);
        console.info(`HOST ${process.env.API_HOST}`);
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
