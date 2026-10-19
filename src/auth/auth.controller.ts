
import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  @Post('dev-token')
  async createDevToken() {
    const payload = {
      sub: 'user-123',
      role: 'customer',
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
