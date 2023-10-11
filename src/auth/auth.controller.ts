import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { message } from 'src/constants/constants';

@Controller('api/users')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.body);
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  create(@Req() req: Request) {
    return this.authService.signup(req.body);
  }

  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    res.clearCookie('jwt');
    throw new Error(message.LOGOUT_MESSAGE);
  }
}
