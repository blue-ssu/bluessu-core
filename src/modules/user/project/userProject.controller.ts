import { Controller, Get, Param } from '@nestjs/common';
import { UserProjectService } from './userProject.service';
import { UserService } from '../user.service';
import { Client, Role } from 'src/modules/auth';
import { ClientType } from 'src/types/ClientType';
import { ProjectUserObject } from 'src/objects/projectUser.object';

@Controller('users/:userId/projects')
export class UserProjectController {
  constructor(
    private readonly userProjectService: UserProjectService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async listUserProject(
    @Param('userId') id: string | 'me',
    @Client() client: ClientType,
  ) {
    const userId = this.userService.getAndCheckUserId(id, client);
    const projectUsers = await this.userProjectService.getProjectUserByUserId(
      +userId,
    );
    return {
      projectUsers: ProjectUserObject.fromArray(projectUsers),
    };
  }
}
