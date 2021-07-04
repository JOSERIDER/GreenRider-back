import { User, UserRepositoryInterface } from '../../../model/domain';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export class AuthService {
  constructor(private userRepository: UserRepositoryInterface) {
  }

  register(user: User): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const userExists = await this.userRepository.exists(user.email);
      if (userExists) {
        reject({ code: 401 });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      user.passwordHash = bcrypt.hashSync(user.passwordHash, salt);

      const newUser = await this.userRepository.create(user);

      const userForToken = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      const token = jwt.sign(
        userForToken,
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24 * 7,
        },
      );

      resolve(token);
    });
  }

  /*
    return the token user.
   */
  login(email: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.userRepository.findByEmail(email).then(user => {
        const validPass = bcrypt.compareSync(password, user.passwordHash);
        if (!validPass) {
          reject({ code: 401 });
          return;
        }


        console.log(user)
        const userForToken = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(
          userForToken,
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60 * 24 * 7,
          },
        );
        resolve(token);
      }).catch(error => {
        console.error(error);
        reject(error);
      });
    });
  }

}