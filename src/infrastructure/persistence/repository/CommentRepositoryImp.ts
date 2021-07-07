import { Comment, CommentRepositoryInterface } from '../../../model/domain';
import { Model } from 'mongoose';
import { MongooseInterface } from '../mongoose/Mongoose.interface';
import commentModel from '../../shema/comment.schema';

export class CommentRepositoryImp implements CommentRepositoryInterface {

  constructor(private model: Model<any>, private connection: MongooseInterface) {
  }

  get(id: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.model.findById(id).then(comment => {
        if (!comment) {
          reject({ code: 404 });

          return;
        }

        resolve(comment);
      }).catch(error => reject(error));
    });
  }

  getComments(): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.model.find().then(comment => {
        resolve(comment);
      }).catch(error => reject(error));
    });
  }

  getUserComments(userId: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.model.find({ user: userId }).then(comment => {
        resolve(comment);
      }).catch(error => reject(error));
    });
  }

  //TODO Remove comment.
  delete(routeId: string, commentId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.model.updateOne({ _id: routeId }, { $unset: { comments: { _id: commentId } } }).then(() => {
        resolve();
      }).catch(error => reject(error));
    });
  }

  insert(comment: Comment): Promise<void> {
    return new Promise((resolve, reject) => {
      this.model.updateOne(
        { _id: comment.routeId },
        { $push: { comments: new commentModel(comment) } },
        { returnOriginal: false })
        .then(() => {
          resolve();
        }).catch(error => reject(error));
    });
  }
}
