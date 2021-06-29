import { User, UserRepositoryInterface } from '../../../model/domain';

export class UserService {

  constructor(private userRepository: UserRepositoryInterface) {
  }

  get(id: string): Promise<User> {
    return this.userRepository.get(id);
  }

  post(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  put(id: string, user: User): Promise<User> {
    return this.userRepository.update(id, user);
  }

  delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
