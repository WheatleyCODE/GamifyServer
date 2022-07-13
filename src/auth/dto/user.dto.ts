import { UserRoles } from 'src/types/users';
import { UserDocument } from 'src/users/schemas/user.schema';

export class UserDto {
  readonly email: string;
  readonly id: string;
  readonly isActivated: boolean;
  readonly roles: UserRoles[];

  constructor(userDocument: UserDocument) {
    this.email = userDocument.email;
    this.id = userDocument._id;
    this.isActivated = userDocument.isActivated;
    this.roles = userDocument.roles;
  }
}
