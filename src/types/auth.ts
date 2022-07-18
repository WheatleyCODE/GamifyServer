import { UserDto } from 'src/auth/dto/user.dto';
import { AccRefTokens } from './tokens';

export interface UserData extends AccRefTokens {
  user: UserDto;
}

export interface ResetPassword {
  message: string;
  email: string;
  status: number;
}

export interface ChangePassword {
  message: string;
  status: number;
}
