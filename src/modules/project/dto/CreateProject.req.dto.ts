import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectReqDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  iconURL: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  termsURL: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  privacyURL: string;
}
