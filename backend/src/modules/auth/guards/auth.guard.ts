import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';

// Define el tipo del payload
interface JwtPayload {
  sub: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      const user = await this.userService.findOne(payload.sub);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...dataUser } = user;

      request.user = dataUser;
    } catch {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
