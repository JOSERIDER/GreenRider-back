import { Comment, CommentRepositoryInterface } from "../../../model/domain";

export class CommentService {

  constructor(private commentRepository: CommentRepositoryInterface) {
  }

  post(comment: Comment): Promise<void> {
    return this.commentRepository.insert(comment);
  }

  delete(routeId: string, commentId: string): Promise<void> {
    return this.commentRepository.delete(routeId, commentId);
  }

  put(comment: Comment) {
    throw new Error("Operation not allowed");
  }
}
