import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  generateToken(payload: any) {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }
    return this.jwtService.sign(payload, {
      secret,
      expiresIn: '90d',
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    if (await this.userService.isEmailTaken(registerUserDto.email)) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.userService.create(registerUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return {
      token: this.generateToken({ id: user.id, username: user.username }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) throw new NotFoundException('Invalid credentials');

    const isValid = await bcrypt.compare(
      loginUserDto.password,
      user.passwordHashed,
    );
    if (!isValid) throw new BadRequestException('Invalid credentials');

    return {
      token: this.generateToken({ id: user._id, username: user.username }),
    };
  }
}
