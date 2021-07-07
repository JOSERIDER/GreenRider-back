import { Comment } from "../entity";

export interface CommentRepositoryInterface {
  get(id: string): Promise<Comment>;

  getComments(): Promise<Comment[]>;

  getUserComments(userId: string): Promise<Comment[]>;

  insert(comment: Comment): Promise<void>;

  delete(id: string, routeId: string): Promise<void>;
}
