// @ts-ignore

import { User } from '../../../model/domain';

declare module 'express' {
  interface Request {
    user?: any;
  }
}
