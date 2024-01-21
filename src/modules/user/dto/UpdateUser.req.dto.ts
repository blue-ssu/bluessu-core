import { IsOptional, IsString } from 'class-validator';

export class UpdateUserReqDto {
  @IsString()
  @IsOptional()
  profileImage: string;
}
