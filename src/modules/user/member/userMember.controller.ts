import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../user.service';
import { Client, Role } from 'src/modules/auth';
import { ClientType } from 'src/types/ClientType';
import { UserMemberService } from './userMember.service';
import { MemberObject } from 'src/objects/member.object';

@Controller('users/:userId/members')
export class UserMemberController {
  constructor(
    private readonly userMemberService: UserMemberService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async listUserProject(
    @Param('userId') id: string | 'me',
    @Client() client: ClientType,
  ) {
    const userId = this.userService.getAndCheckUserId(id, client);
    const members = await this.userMemberService.getProjectMemberByUserId(
      +userId,
    );
    return {
      members: MemberObject.fromArray(members),
    };
  }
}
