export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface CreateUserOptions {
  email: string;
  password: string;
  nickName: string;
}
