import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectMemberService } from './member.service';
import { Client, Role } from 'src/modules/auth';
import { ProjectService } from '../../project.service';
import { ClientType } from 'src/types/ClientType';
import { AddMemberToProjectReqDto } from './dto/AddMemberToProject.req.dto';
import { UpdateMemberRoleReqDto } from './dto/UpdateMemberRole.req.dto';
import { MemberObject } from 'src/objects/member.object';

@Controller('projects/:projectId/members')
export class ProjectMemberController {
  constructor(
    private readonly projectMemberService: ProjectMemberService,
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async listProjectMembers(
    @Param('projectId') projectId: string,
    @Client() client: ClientType,
  ) {
    await this.projectService.checkClientHasPermission(+projectId, client);
    const members = await this.projectMemberService.findAll(+projectId);
    return {
      members: MemberObject.fromArray(members),
    };
  }

  @Get(':memberId')
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async getProjectMember(
    @Param('projectId') projectId: string,
    @Param('memberId') memberId: string,
    @Client() client: ClientType,
  ) {
    await this.projectService.checkClientHasPermission(+projectId, client);
    const member = await this.projectMemberService.findOne(
      +projectId,
      +memberId,
    );
    return {
      member: MemberObject.from(member),
    };
  }

  @Post()
  @Role(['User', 'User:Admin'])
  async addMemberToProject(
    @Param('projectId') projectId: string,
    @Client() client: ClientType,
    @Body() dto: AddMemberToProjectReqDto,
  ) {
    await this.projectService.checkClientHasPermission(
      +projectId,
      client,
      'Owner',
    );
    const member = await this.projectMemberService.addMember(
      +projectId,
      dto.userId,
    );
    return {
      member: MemberObject.from(member),
    };
  }

  @Patch(':memberId/role')
  @Role(['User', 'User:Admin'])
  async updateMemberRole(
    @Param('projectId') projectId: string,
    @Param('memberId') memberId: string,
    @Client() client: ClientType,
    @Body() dto: UpdateMemberRoleReqDto,
  ) {
    await this.projectService.checkClientHasPermission(
      +projectId,
      client,
      'Owner',
    );
    const member = await this.projectMemberService.updateMemberRole(
      +projectId,
      +memberId,
      dto.role,
    );
    return {
      member: MemberObject.from(member),
    };
  }

  @Delete(':memberId')
  @Role(['User', 'User:Admin'])
  async removeMemberFromProject(
    @Param('projectId') projectId: string,
    @Param('memberId') memberId: string,
    @Client() client: ClientType,
  ) {
    await this.projectService.checkClientHasPermission(
      +projectId,
      client,
      'Owner',
    );
    return await this.projectMemberService.removeMember(+projectId, +memberId);
  }
}
