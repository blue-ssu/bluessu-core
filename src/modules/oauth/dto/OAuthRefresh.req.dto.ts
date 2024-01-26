import { IsString } from 'class-validator';

export class OAuthRefreshReqDto {
  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  refreshToken: string;
}
