import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TeacherScheduleService} from "./TeacherSchedule.service";
import {TeacherSchedule} from "@prisma/client";


     @Controller('teacherSchedule')
export class TeacherScheduleController {
    constructor(private readonly teacherSchudele: TeacherScheduleService) {
    }
 @Post('')
    createShedule(
     @Body()
         subjectInDate: {
         accountName:string;
         subjectName: string;
         time: string;
         nameDate: string;
         className: string;
         yearName: string;
     },
 ){
     const {accountName, subjectName, time, nameDate, className, yearName } = subjectInDate;
     return this.teacherSchudele.create({
         account:{
             connect:{
            userName:accountName
             }
         },
         Subject: {
             connect: {
                 name: subjectName,
             },
         },
         time,
         nameDate,
         class: {
             connect: {
                 name: className,
             },
         },
         Year:{
             connect: {
                 name: yearName,
             }
         }

     });
 }
 @Get('')
        getAll(
     @Query('userName') userName,
     @Query('year')yearName

 ){
        return this.teacherSchudele.getByTeacher( {
         userName,yearName
     });
 }
         @Patch(':id')
         update(
             @Param('id') id: string,
             @Body()
                 subjectInDate: {
                 subjectName: string;
                 time: string;
                 nameDate: string;
                 className: string;
                 userName: string;
             },
         ) {
             const { subjectName, time, nameDate, className,userName } = subjectInDate;
             return this.teacherSchudele.update({
                 where: { id },
                 data: {
                     ...subjectInDate,
                 },
             });
         }

     }
