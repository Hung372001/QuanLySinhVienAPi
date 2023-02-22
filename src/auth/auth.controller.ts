import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { sign } from 'crypto';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoLogin } from './dto/auth.dto';

// Điều hướng, try catch call service
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  async signUp(@Body() dto: AuthDto) {
    try {
      const response = await this.authService.signUp(dto);
      if (response.isError) {
        return response.message;
      }
      return response;
    } catch (error) {}
    return this.authService.signUp(dto);
  }
  @Post('sign-in')
  signIn(@Body() dto: AuthDtoLogin, @Req() req, @Res() res) {
    return this.authService.signIn(dto, req, res);
  }
  @Get('sign-out')
  signOut(@Req() req, @Res() res) {
    return this.authService.signOut(req, res);
  }
}
