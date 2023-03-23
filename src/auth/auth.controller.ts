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
import {AuthDto, AuthDtoLogin, AuthDtoStudent, AuthDtoTeacher} from './dto/auth.dto';
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

  @Post('signup/student')
  async signUpStudent(@Body() dto: AuthDtoStudent) {
    try {
      const response = await this.authService.signUpStudent(dto);
      if (response.isError) {
        return {isError: true, message: response.message};
      }
      return response;
    } catch (error) {}
    return this.authService.signUpStudent(dto);
  }

  @Post('signup/teacher')
  async signUpTeacher(@Body() dto: AuthDtoTeacher) {
    try {
      const response = await this.authService.signUpTeacher(dto);
      if (response.isError) {
        return {isError: true, message: response.message};
      }
      return response;
    } catch (error) {}
    return this.authService.signUpTeacher(dto);
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
