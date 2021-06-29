import { User } from '../entity';

export interface UserRepositoryInterface {
  get(id: string): Promise<User>;

  delete(id: string): Promise<void>;

  update(id: string, user: User): Promise<User>;

  create(user: User): Promise<User>;
}
