import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchUserReqDto {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  name: string;

  @IsOptional()
  @IsString()
  studentId: string;
}
