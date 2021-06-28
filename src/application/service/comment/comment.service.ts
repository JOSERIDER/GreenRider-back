import { Comment, CommentRepositoryInterface } from "../../../model/domain";

export class CommentService {

  constructor(private commentRepository: CommentRepositoryInterface) {
  }


  getComment(id: string): Promise<Comment> {
    return this.commentRepository.get(id);
  }

  getComments(): Promise<Comment[]> {
    return  this.commentRepository.getComments();
  }

  post(comment: Comment): Promise<Comment> {
    return this.commentRepository.insert(comment);
  }

  delete(id: string): Promise<void> {
    return this.commentRepository.delete(id);
  }

  put(comment: Comment) {
    throw new Error("Operation not allowed");
  }
}
