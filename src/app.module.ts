import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { PermissionModule } from './permission/permission.module';

import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    MenuModule,
    PermissionModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  // // controllers: [

  //       MenuController, AppController],
  // // providers: [
  //       MenuService, PermissionService, AppService],
})
export class AppModule {}
