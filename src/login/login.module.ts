import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LoginService } from './login.service';
import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'defaultSecret',
        signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService],
})
export class LoginModule {}
