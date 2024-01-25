import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Client, Role } from '../auth';
import { ClientType } from 'src/types/ClientType';
import { InvalidClientType } from 'src/errors/InvalidClientType';
import { CreateProjectReqDto } from './dto/CreateProject.req.dto';
import { ProjectObject } from 'src/objects/project.object';
import { UpdateProjectReqDto } from './dto/UpdateProject.req.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @Role(['User:Admin', 'Project:AuthService'])
  async listProject() {
    const projects = await this.projectService.findAll();
    return {
      projects: ProjectObject.fromArray(projects),
    };
  }

  @Get(':projectId')
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async getProject(
    @Param('projectId') projectId: string,
    @Client() client: ClientType,
  ) {
    await this.projectService.checkClientHasPermission(+projectId, client);
    const project = await this.projectService.findOne(+projectId);
    return {
      project: ProjectObject.from(project),
    };
  }

  @Post()
  @Role(['User', 'User:Admin'])
  async createProject(
    @Client() client: ClientType,
    @Body() dto: CreateProjectReqDto,
  ) {
    if (client.type !== 'user') {
      throw new InvalidClientType();
    }
    const project = await this.projectService.create({
      name: dto.name,
      description: dto.description,
      url: dto.url,
      iconURL: dto.iconURL,
      privacyURL: dto.privacyURL,
      termsURL: dto.termsURL,
      ownerUserId: client.user.id,
    });
    return {
      project: ProjectObject.from(project),
    };
  }

  @Patch(':projectId')
  @Role(['User', 'User:Admin'])
  async updateProject(
    @Param('projectId') projectId: string,
    @Client() client: ClientType,
    @Body() dto: UpdateProjectReqDto,
  ) {
    if (client.type !== 'user') {
      throw new InvalidClientType();
    }
    await this.projectService.checkClientHasPermission(
      +projectId,
      client,
      'Owner',
    );
    const project = await this.projectService.update(+projectId, {
      name: dto.name,
      description: dto.description,
      url: dto.url,
      iconURL: dto.iconURL,
      privacyURL: dto.privacyURL,
      termsURL: dto.termsURL,
      redirectURLs: dto.redirectURLs,
      oAUthStatus: dto.oAuthStatus,
    });
    return {
      project: ProjectObject.from(project),
    };
  }

  @Post(':projectId/client-secret')
  @Role(['User', 'User:Admin'])
  async generateClientSecret(
    @Param('projectId') projectId: string,
    @Client() client: ClientType,
  ) {
    if (client.type !== 'user') {
      throw new InvalidClientType();
    }
    await this.projectService.checkClientHasPermission(
      +projectId,
      client,
      'Owner',
    );
    const project = await this.projectService.generateProjectClientSecret(
      +projectId,
    );
    return {
      project: ProjectObject.from(project),
    };
  }

  @Delete(':projectId')
  @Role(['User', 'User:Admin'])
  async deleteProject(
    @Param('projectId') projectId: string,
    @Client() client: ClientType,
  ) {
    if (client.type !== 'user') {
      throw new InvalidClientType();
    }
    await this.projectService.checkClientHasPermission(
      +projectId,
      client,
      'Owner',
    );
    return await this.projectService.delete(+projectId);
  }
}
