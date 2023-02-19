import { Controller, Post, Body, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
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

  @Post('refresh')
  @UseGuards(AuthGuard())
  async refresh(@CurrentUser() user: User ):Promise<AuthResponse> {
    console.log(user);
    return await this.authService.refreshToken(user);
  }
}
