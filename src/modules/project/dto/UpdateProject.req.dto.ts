import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProjectReqDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsUrl()
  iconURL: string;

  @IsOptional()
  @IsUrl()
  termsURL: string;

  @IsOptional()
  @IsUrl()
  privacyURL: string;

  @IsString()
  @IsOptional()
  redirectURLs: string;
}
