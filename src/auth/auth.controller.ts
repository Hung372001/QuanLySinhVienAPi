import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { sign } from 'crypto';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoLogin } from './dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
const fs = require('fs');

import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
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
