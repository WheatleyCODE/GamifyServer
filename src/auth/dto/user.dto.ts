import { Storage } from 'src/storage/schemas/storage.schema';
import { UserRoles } from 'src/types/users';
import { UserDocument } from 'src/users/schemas/user.schema';

export class UserDto {
  readonly email: string;
  readonly _id: string;
  readonly isActivated: boolean;
  readonly roles: UserRoles[];
  readonly nickName: string;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly storage: Storage;

  constructor(userDocument: UserDocument) {
    this.email = userDocument.email;
    this._id = userDocument._id;
    this.isActivated = userDocument.isActivated;
    this.roles = userDocument.roles;
    this.nickName = userDocument.nickName;
    this.firstName = userDocument.firstName || null;
    this.lastName = userDocument.lastName || null;
    this.storage = userDocument.storage;
  }
}
