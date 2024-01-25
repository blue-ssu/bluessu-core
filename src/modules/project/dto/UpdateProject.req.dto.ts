import { IsArray, IsIn, IsOptional, IsString, IsUrl } from 'class-validator';

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

  @IsArray()
  @IsUrl({ require_tld: false, require_protocol: true }, { each: true })
  @IsOptional()
  redirectURLs: string[];

  @IsString()
  @IsIn(['Active', 'Inactive'])
  @IsOptional()
  oAuthStatus: 'Active' | 'Inactive';
}
