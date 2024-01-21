import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserReqDto {
  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  studentId: string;

  @IsString()
  department: string;

  @IsString()
  @IsOptional()
  profileImage: string;
}
