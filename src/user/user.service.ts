import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';
import { UpdatePassword } from './dto/update-password.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    // const decodedUserInfo = req.account as { id: string; userName: string };
    const foundUser = await this.prisma.account.findUnique({ where: { id } });

    console.log('id');
    if (!foundUser) {
      throw new NotFoundException();
    }
    delete foundUser.hashedPassword;
    return { user: foundUser };
  }

  async getMyUserbyEmail(userName: string, req: Request) {
    const foundUser = await this.prisma.account.findUnique({
      where: { userName },
    });
    console.log('id');
    if (!foundUser) {
      throw new NotFoundException();
    }
    delete foundUser.hashedPassword;
    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prisma.account.findMany({
      select: {
        id: true,
        email: true,
        avatar: true,
        fullName: true,
        permissionCode: true,
        userName: true,
        numberPhone: true,
      },
    });
    return { users };
  }

  async updateAvatar(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { data, where } = params;
    return this.prisma.account.update({
      data,
      where,
    });
  }
  async changePassword(
    dto: UpdatePassword,

    res: Response,
    userName: string,
  ) {
    const { oldPassword, newPassword } = dto;
    if (oldPassword !== newPassword) {
      return res.status(451).json('Mật khẩu không giống nhau');
    }
    const hashedPassword = await this.hashPassword(newPassword);
    await this.prisma.account.update({
      where: { userName },
      data: { hashedPassword },
    });
    return res.status(200).json({
      Message: 'đổi mật khẩu thành công',
    });
  }
  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
