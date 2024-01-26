import { IsString } from 'class-validator';

export class OAuthAuthReqDto {
  @IsString()
  clientId: string;

  @IsString()
  redirectURL: string;
}
