import {Schema, model} from "mongoose";
import { RouteDomain } from "../../model/domain";

const schemaDefinition:RouteDomain = {

}

const routeSchema = new Schema(schemaDefinition)

const Route = model("Route", routeSchema);
export default  Route;