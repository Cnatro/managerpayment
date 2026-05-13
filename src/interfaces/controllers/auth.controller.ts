/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // đăng ký
  @Post('register')
  async register(@Body() body: any) {
    const user = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );

    return {
      message: 'Đăng ký thành công',
      data: user,
    };
  }

  // đăng nhập
  @Post('login')
  async login(@Body() body: any) {
    const result = await this.authService.login(body.email, body.password);

    return {
      message: 'Đăng nhập thành công',
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() currentUser: any) {
    const user = await this.authService.getProfile(Number(currentUser.id));

    return {
      message: 'Lấy thông tin thành công',
      data: user,
    };
  }
}
