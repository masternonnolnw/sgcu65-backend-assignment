import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('signout')
  signout() {
    return this.authService.signout();
  }
  @Get('currentUser')
  checkCurrentUser() {
    return this.authService.checkCurrentUser();
  }

  @Post('resetPassword')
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }
}
