import { IsString } from 'class-validator';

export class SsoLoginReqDto {
  @IsString()
  sToken: string;
}
