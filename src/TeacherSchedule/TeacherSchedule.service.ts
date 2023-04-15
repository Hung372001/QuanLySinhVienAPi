import {Injectable} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {Prisma, TeacherSchedule} from "@prisma/client";

@Injectable()
export class TeacherScheduleService {
    constructor(private prisma: PrismaService) {
    }
   async create(data:Prisma.TeacherScheduleCreateInput){
        const checkTeacher = await this.prisma.account.findUnique({

                where:{
                    userName:data.account.connect.userName,
                },
                select:{
                    permissionCode:true,
                    subjectTeacherName:true,
                }
       })

       if (checkTeacher.permissionCode == 'hs'){
         return {message:'Tài Khoản Không Là Giáo Vien'}
       }else if(data.Subject.connect.name.includes(checkTeacher.subjectTeacherName) !== true){
           return {message:'Giáo Viên Không Thuộc Bộ Môn'}
       }
       console.log()
       return await this.prisma.teacherSchedule.create({
           data
       });
   }
   async getByTeacher(params: {
       userName?: string;
       yearName?: string;
   }){
       let { userName,yearName } = params;
       if (yearName == 'undefined') {
           const year = await this.prisma.year.findMany(
               {
                   where: {isActive: true},
                   orderBy: {name: 'desc'},
                   take: 1,
               }
           );
           yearName = year[0].name
       }
       return await this.prisma.teacherSchedule.findMany({
            where:{
                accountName:userName,
              yearName:yearName,
            }
        })
   }
    async update(params: { data; where: Prisma. TeacherScheduleWhereUniqueInput }) {
        const { data, where } = params;
        console.log(where);

        console.log(data);
        if (where.id === 'undefined') {
            console.log(true);
            const createShedule = await this.prisma.teacherSchedule.createMany({
                data,
            });
            return createShedule;
        }

        const sheduleUpdate = await this.prisma.teacherSchedule.update({
            where,
            data,
        });
        return;
    }
}