import { CommentRepositoryInterface, RouteRepositoryInterface, UserRepositoryInterface } from '../../model/domain';
import { CommentRepositoryImp, RouteRepositoryImp, UserRepositoryImp } from '../persistence/repository';
import { AuthService, CommentService, RouteService } from '../../application/service';
import { Router } from 'express';
import { routeRoute } from './route.route';
import { MongooseInterface } from '../persistence/mongoose/Mongoose.interface';
import routeModel from '../shema/route.schema';
import handleErrors from '../middleware/handleErrors';
import { commentRoute } from './comment.route';
import notFound from '../middleware/notFound';
import userModel from '../shema/user.schema';
import { UserService } from '../../application/service';
import { userRoute } from './user.route';
import { authRoute } from './auth.route';

/**
 * Instantiate the repositories
 */
export class Route {
  private readonly r: Router = Router();

  constructor(private mongoose: MongooseInterface) {
    //Instantiate repositories
    const routeRepository: RouteRepositoryInterface = new RouteRepositoryImp(routeModel, mongoose);
    const commentRepository: CommentRepositoryInterface = new CommentRepositoryImp(routeModel, mongoose);
    const userRepository: UserRepositoryInterface = new UserRepositoryImp(userModel, mongoose);

    //Instantiate services.
    const routeService: RouteService = new RouteService(routeRepository);
    const commentService: CommentService = new CommentService(commentRepository);
    const userService: UserService = new UserService(userRepository);
    const authService: AuthService = new AuthService(userRepository);

    //Declare routes.
    const route = Router();
    routeRoute(route, routeService);
    commentRoute(route, commentService);
    userRoute(route, userService);
    authRoute(route, authService);

    this.r.use('/api', route);
    this.control();
  }

  public getRouter(): Router {
    return this.r;
  }

  private control(): void {
    this.r.get('/health', (req, res) => {
      res.status(200).json({ status: true });
    });

    this.r.use('*', notFound);

    this.r.use(handleErrors);
  }
}
