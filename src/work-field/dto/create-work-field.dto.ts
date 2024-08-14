import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkFieldDto {
  @IsString()
  @IsNotEmpty()
  value: string;
  @IsString()
  @IsNotEmpty()
  field_id: string;
  @IsString()
  @IsNotEmpty()
  work_id: string;
}
