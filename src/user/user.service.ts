import {Injectable, NotFoundException,} from '@nestjs/common';
import {Account, Prisma} from '@prisma/client';

import {PrismaService} from 'prisma/prisma.service';
import {UpdatePassword} from './dto/update-password.dto';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async getMyUser(id: string, req: Request) {
    // const decodedUserInfo = req.account as { id: string; userName: string };
    const foundUser = await this.prisma.account.findUnique({where: {id}});

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
        sex: true,
        Address: true,
        Date: true,
        numberPhone: true,
      },
    });
    return {users};
  }

  async getAllStudents(params: {
    page?: number,
  }) {
    let {page} = params;
    let users
    if (isNaN(page)) {
      users = await this.prisma.account.findMany({
        where: {
          permissionCode: 'hs',
        },
        select: {
          id: true,
          userName: true,
          fullName: true,
          sex: true,
          Address: true,
          numberPhone: true,
          Date: true,
          className: true,
          email: true
        },
      });
    } else {
      users = await this.prisma.account.findMany({
        where: {
          permissionCode: 'hs',
        },
        take: 12,
        skip: (page - 1) * 12,
        select: {
          id: true,
          userName: true,
          fullName: true,
          sex: true,
          Address: true,
          numberPhone: true,
          Date: true,
          className: true,
          email: true
        },
      });
    }

    return users;
  }

  async updateAvatar(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const {data, where} = params;
    return this.prisma.account.update({
      data,
      where,
    });
  }

  async createManyTeacher(dto) {
    let hashPassword1 = [];
    hashPassword1 = await Promise.all(
        dto.data.data.map(async (item) => {
          return await this.hashPassword(item.userName + 'a');
        }),
    );

    let data = await dto.data.data.map((el, index) => ({
      userName: el.userName,
      fullName: el.fullName,
      sex: el.sex,
      Date: el.Date,
      Address: el.Address,
      numberPhone: el.numberPhone,
      permissionCode: 'gv',
      hashedPassword: hashPassword1[index],
      subjectTeacherName: el.subjectTeacherName,
      email: el.email,
      className: '',
    }));
    console.log(data);
    return await this.prisma.account.createMany({
      data,
    });
  }

  async createMany(dto) {
    let hashPassword1 = [];
    hashPassword1 = await Promise.all(
        dto.data.data.map(async (item) => {
          return await this.hashPassword(item.userName + 'a');
        }),
    );

    let data = await dto.data.data.map((el, index) => ({
      userName: el.userName,
      fullName: el.fullName,
      className: el.className,
      sex: el.sex,
      Date: el.Date,
      Address: el.Address,
      numberPhone: el.numberPhone,
      permissionCode: 'hs',
      hashedPassword: hashPassword1[index],
      email: el.email,
    }));
    console.log(data);
    return await this.prisma.account.createMany({
      data,
    });
  }

  async changePassword(
      dto: UpdatePassword,
      res: Response,
      userName: string,
  ) {
    const {oldPassword, newPassword} = dto;
    if (oldPassword !== newPassword) {
      return res.status(451).json('Mật khẩu không giống nhau');
    }
    const hashedPassword = await this.hashPassword(newPassword);
    await this.prisma.account.update({
      where: {userName},
      data: {hashedPassword},
    });
    return res.status(200).json({
      Message: 'đổi mật khẩu thành công',
    });
  }

  asyn;

  async UpdateUser(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const {data, where} = params;
    let hashedPassword;
    if (data.hashedPassword !== undefined) {
      let password = data.hashedPassword;
      hashedPassword = await bcrypt.hash(password, 10);
    }
    data.hashedPassword = hashedPassword;
    console.log(data);

    return this.prisma.account.update({
      where,
      data,
    });
  }

  async DeleteAccount(userName: string) {
    return await this.prisma.account.delete({
      where: {userName},
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
