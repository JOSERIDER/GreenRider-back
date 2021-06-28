/**
 * Instantiate the repositories
 */
import { CommentRepositoryInterface, RouteRepositoryInterface } from "../../model/domain";
import { RouteRepositoryImp } from "../persistence/repository";
import { CommentService, RouteService } from "../../application/service";
import { Router } from "express";
import { routeRoute } from "./route.route";
import { MongooseInterface } from "../persistence/mongoose/Mongoose.interface";
import routeModel from "../shema/route.schema";
import handleErrors from "../middleware/handleErrors";
import { CommentRepositoryImp } from "../persistence/repository";
import commentModel from "../shema/comment.schema";
import { commentRoute } from "./comment.route";
import notFound from "../middleware/notFound";

export class Route {
  private readonly r: Router = Router();

  constructor(private mongoose: MongooseInterface) {
    //Instantiate repositories
    const routeRepository: RouteRepositoryInterface = new RouteRepositoryImp(routeModel, mongoose);
    const commentRepository: CommentRepositoryInterface = new CommentRepositoryImp(commentModel, mongoose);

    //Instantiate services.
    const routeService: RouteService = new RouteService(routeRepository);
    const commentService: CommentService = new CommentService(commentRepository);

    //Declare routes.
    const route = Router();
    routeRoute(route, routeService);
    commentRoute(route, commentService);

    this.r.use("/api", route);
    this.control();
  }

  public getRouter(): Router {
    return this.r;
  }

  private control(): void {
    this.r.get('/health', (req, res) => {
      res.status(200).json({ status: true })
    });

    this.r.use('*', notFound);

    this.r.use(handleErrors)
  }

}