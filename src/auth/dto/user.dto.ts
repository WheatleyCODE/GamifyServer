import { UserRoles } from 'src/types/users';
import { UserDocument } from 'src/users/schemas/user.schema';

export class UserDto {
  readonly email: string;
  readonly id: string;
  readonly isActivated: boolean;
  readonly roles: UserRoles[];
  readonly nickName: string;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly activationLink: string;

  constructor(userDocument: UserDocument) {
    this.email = userDocument.email;
    this.id = userDocument._id;
    this.isActivated = userDocument.isActivated;
    this.roles = userDocument.roles;
    this.nickName = userDocument.nickName;
    this.firstName = userDocument.firstName || null;
    this.lastName = userDocument.lastName || null;
    this.activationLink = userDocument.activationLink;
  }
}
