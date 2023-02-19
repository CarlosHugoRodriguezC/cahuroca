import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';

import { UsersService } from '../users/users.service';

import { LoginUserDto } from './dto';
import { CreateUserInput } from '../users/dto/create-user.input';

import { AuthResponse, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserInput: CreateUserInput): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserInput);

    const token = this.getJwtToken({ uid: user.id });

    delete user.password;

    return {
      token,
      user,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = loginUserDto;

    let user: User = null;
    try {
      user = await this.usersService.findOne(email);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid Credentials');
    }

    if (!user.isActive)
      throw new UnauthorizedException(
        `User with email ${email} was desactivated`,
      );

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Invalid Credentials');

    const token = this.getJwtToken({ uid: user.id });

    delete user.password;

    return {
      token,
      user,
    };
  }

  async refreshToken(user: User): Promise<AuthResponse> {
    const token = this.getJwtToken({ uid: user.id });
    const { password, ...rest } = user;
    return {
      token,
      user: rest as User,
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
