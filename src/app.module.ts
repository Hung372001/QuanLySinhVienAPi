import { PermissionModule } from './permission/permission.module';

import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PermissionModule, PrismaModule, AuthModule, ConfigModule.forRoot()],
  // controllers: [AppController],
  // providers: [PermissionService, AppService],
})
export class AppModule {}
