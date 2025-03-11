import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { checkPassword } from './common/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findUserAuth(email);
    const isMatch = await checkPassword(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    const payload = { sub: user.id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
