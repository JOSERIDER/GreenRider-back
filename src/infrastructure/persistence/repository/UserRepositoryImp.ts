import { User, UserRepositoryInterface } from '../../../model/domain';
import { Model } from 'mongoose';
import { MongooseInterface } from '../mongoose/Mongoose.interface';
import * as mongoose from 'mongoose';

export class UserRepositoryImp implements UserRepositoryInterface {

  constructor(private userModel: Model<any>, private connection: MongooseInterface) {
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userModel.findByIdAndDelete(id).then(response => {
        if (!response) {
          reject({ code: 404 });
          return;
        }
        resolve();
        UserRepositoryImp.closeConnection();
      }).catch(error => {
        reject(error);
        UserRepositoryImp.closeConnection();
      });
    });
  }

  get(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userModel.findById(id).then(user => {
        if (!user) {
          reject({ code: 404 });
          return;
        }
        user.id = user._id;
        delete user._id;
        resolve(user);
        UserRepositoryImp.closeConnection();
      }).catch(error => {
        console.log(error);
        reject(error);
        UserRepositoryImp.closeConnection();
      });
    });
  }

  update(id: string): Promise<User> {
    return Promise.resolve({} as User);
  }

  create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userModel.create(user).then(user => {
        user.id = user._id;
        delete user._id;
        resolve(user);
        UserRepositoryImp.closeConnection();
      }).catch(error => {
        console.log(error);
        reject(error);
        UserRepositoryImp.closeConnection();
      });
    });
  }

  findByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({ email }).then(user => {
        if (!user) {
          reject({ code: 404 });
          return;
        }
        user.id = user._id;
        delete user._id;
        resolve(user);
        UserRepositoryImp.closeConnection();
      }).catch(error => {
        console.log(error);
        reject(error);
        UserRepositoryImp.closeConnection();
      });
    });
  }

  exists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userModel.exists({ email })
        .then(exists => {
          resolve(exists);
          UserRepositoryImp.closeConnection();
        })
        .catch(error => {
          console.log(error);
          reject(error);
          UserRepositoryImp.closeConnection();
        });
    });
  }

  private static closeConnection() {
   void mongoose.disconnect();
  }
}
