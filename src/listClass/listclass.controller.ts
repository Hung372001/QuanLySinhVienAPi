/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateListClassDto } from './dto/create-listClass.dto';
import { UpdateListClassDto } from './dto/update-listClass.dto';
import { ListClassService } from './listclass.service';

@Controller()
export class ListClassController {
  constructor(private readonly classListService: ListClassService) {}

  @Post()
  create(@Body() createListClassDto: CreateListClassDto) {
    return this.classListService.create(createListClassDto);
  }

  @Get()
  findAll() {
    return this.classListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classListService.findOne(id);
  }
  @Get('list/:name')
  getAllClass(@Param('name') name: string) {
    return this.classListService.getListClass(name);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiaDto: UpdateListClassDto) {
    return this.classListService.update(id, updateBiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classListService.remove(id);
  }
}
