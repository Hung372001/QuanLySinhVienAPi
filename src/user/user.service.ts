import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const foundUser = await this.prisma.account.findUnique({ where: { id } });
    // const decodedUserInfo = req.userName as { id: string; userName: string };
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
}
