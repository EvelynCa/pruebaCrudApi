import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserDto): Promise<UserDto> {
    let createdUser: UserDto;
    console.log("si llego ", dto.password)
    
    try {
      // Asegurándote de que el salt se genera correctamente
      
      //const hashedPassword = await bcrypt.hash("password32", 10);  // Utiliza el salt generado previamente
      //console.log('Password hashed successfully:', hashedPassword);
    } catch (error) {
      console.error('Error hashing password:', error);
    }
      console.log("hashedPassword")
      
      createdUser =  await this.userService.create( dto );

    return createdUser;
    
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findAll().then(users =>
      users.find(u => u.email === email),
    );
    console.log(user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
