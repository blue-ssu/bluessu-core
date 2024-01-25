import { IsNumber } from 'class-validator';

export class AddMemberToProjectReqDto {
  @IsNumber()
  userId: number;
}
