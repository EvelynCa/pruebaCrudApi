import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
    console.log(dto)
    try {
      console.log('vamo a entrar')
      const result = await this.loginService.register(dto);
      return result;
    } catch (error) {
      return error;
    }
    
    
  }

  @Post('')
  login(@Body() credentials: { email: string; password: string }) {
    return this.loginService.login(credentials.email, credentials.password);
  }
}
