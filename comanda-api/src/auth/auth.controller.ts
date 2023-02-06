import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserInput } from '../users/dto/create-user.input';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { AuthResponse } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(
    @Body() createUserInput: CreateUserInput,
  ): Promise<AuthResponse> {
    return await this.authService.register(createUserInput);
  }
}
