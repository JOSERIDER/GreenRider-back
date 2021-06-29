import { User, UserRepositoryInterface } from '../../../model/domain';
import { Model } from 'mongoose';
import { MongooseInterface } from '../mongoose/Mongoose.interface';

export class UserRepositoryImp implements UserRepositoryInterface {

  constructor(private userModel: Model<any>, private connection: MongooseInterface) {
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  get(id: string): Promise<User> {
    return Promise.resolve({} as User);
  }

  update(id: string): Promise<User> {
    return Promise.resolve({} as User);
  }

  create(user: User): Promise<User> {
    return Promise.resolve({} as User);
  }
}
