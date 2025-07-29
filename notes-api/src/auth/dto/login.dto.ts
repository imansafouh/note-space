import { OmitType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';

export class LoginUserDto extends OmitType(RegisterUserDto, [
  'username',
] as const) {}
