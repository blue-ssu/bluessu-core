import { IsIn } from 'class-validator';

export class UpdateMemberRoleReqDto {
  @IsIn(['Member', 'Owner'])
  role: 'Member' | 'Owner';
}
