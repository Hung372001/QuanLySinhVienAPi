import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Put, Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Account as AccountModel } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UpdatePassword } from './dto/update-password.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Patch('avatar/:userName')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  updatedAvatar(
    @Param('userName') userName: string,
    @Body()
    UserData: {
      avatar: string;
    },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AccountModel> {
    const { avatar } = UserData;
    return this.usersService.updateAvatar({
      where: { userName },
      data: {
        avatar: file.filename,
      },
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }
  @UseGuards(JwtAuthGuard)
  @Get('username/:userName')
  getMyUserbyEmail(@Param() params: { userName: string }, @Req() req) {
    return this.usersService.getMyUserbyEmail(params.userName, req);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.usersService.getUsers();
  }
  @Get('img/:imagename')
  getImg(@Param('imagename') imagename, @Res() res): Observable<Object> {
    console.log(imagename);
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
  @Put('changePassword/:userName')
  ChangePassword(
    @Param('userName') userName: string,
    @Body() updatePassword: UpdatePassword,

    @Res() res,
  ) {
    return this.usersService.changePassword(updatePassword, res, userName);
  }
}
