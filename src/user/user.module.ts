import { JwtStrategy } from 'src/auth/jwt.strangegy';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UserModule {}
