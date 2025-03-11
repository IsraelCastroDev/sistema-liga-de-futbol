import { UserWithoutPassword } from '../../../modules/users/interfaces/user-without-password.interface';

declare module 'express' {
  interface Request {
    user?: UserWithoutPassword;
  }
}
