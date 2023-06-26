import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
// import { plainToClass } from 'class-transformer';
// import { User } from './user/user.entity';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { SkipAuth } from './auth/auth.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SkipAuth()
  // @UseGuards(LocalAuthGuard)
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    // return req.user;

    // const responseBody: IResponseBody<User> = {
    //   success: true,
    //   message: '登录成功！',
    //   data: plainToClass(User, req.user),
    // };
    // return responseBody;
    const authInfo = await this.authService.login(req.user);
    const responseBody: IResponseBody<IAuthInfo> = {
      success: true,
      message: '成功！',
      data: authInfo,
    };
    return responseBody;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
