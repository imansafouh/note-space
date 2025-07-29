import { OmitType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

export class UpdateUserDto extends OmitType(RegisterUserDto, [
  'password',
] as const) {}
