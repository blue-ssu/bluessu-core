import { IsString } from 'class-validator';

export class OAuthTokenReqDto {
  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  code: string;
}
