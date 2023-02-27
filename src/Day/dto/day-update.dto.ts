import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDayDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
