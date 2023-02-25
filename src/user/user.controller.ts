import { Controller, Get, Param, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }
  @Get('username/:userName')
  getMyUserbyEmail(@Param() params: { userName: string }, @Req() req) {
    return this.usersService.getMyUserbyEmail(params.userName, req);
  }
  @Get()
  getUser() {
    return this.usersService.getUsers();
  }
}
