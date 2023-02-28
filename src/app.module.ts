import { ListClassModule } from './listClass/listclass.module';
import { DayModule } from './Day/day.module';
import { ClassModule } from './Class/class.module';
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
    ListClassModule,
    DayModule,
    ClassModule,
    UserModule,
    MenuModule,
    PermissionModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  // // control
})
export class AppModule {}
