import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() CreatePermissionDto: CreatePermissionDto) {
    return this.permissionService.create(CreatePermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') Ma: string) {
    return this.permissionService.findOne(Ma);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, UpdatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}
