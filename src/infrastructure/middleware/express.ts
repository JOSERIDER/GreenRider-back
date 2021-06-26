import { Express, json } from "express";
import cors from "cors"

export const setMiddlewareExpress = (express: Express) => {
  express.use(cors());
  express.use(json());
}
