import { Comment, CommentRepositoryInterface } from "../../../model/domain";
import { Model } from "mongoose";
import { MongooseInterface } from "../mongoose/Mongoose.interface";

export class CommentRepositoryImp implements CommentRepositoryInterface {

  constructor(private commentModel: Model<any>, private connection: MongooseInterface) {
  }

  get(id: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.commentModel.findById(id).then(comment => {
        if (!comment) {
          reject({ code: 404 });

          return;
        }

        resolve(comment);
      }).catch(error => reject(error));
    })
  }

  getComments(): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.commentModel.find().then(comment => {
        resolve(comment);
      }).catch(error => reject(error));
    })
  }

  getUserComments(userId: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.commentModel.find({ user: userId }).then(comment => {
        resolve(comment);
      }).catch(error => reject(error));
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.commentModel.findByIdAndRemove(id).then(() => resolve())
        .catch(error => reject(error));
    })
  }

  insert(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.commentModel.create(comment).then(comment => {
        resolve(comment);
      }).catch(error => reject(error));
    })
  }
}
