import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { User } from 'src/entities/user.entity';
import { ProjectNotFoundException } from 'src/errors';
import { ClientType } from 'src/types/ClientType';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectMember)
    private readonly projectMemberRepository: Repository<ProjectMember>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: {
    name: string;
    description: string;
    url: string;
    iconURL: string;
    privacyURL: string;
    termsURL: string;
    ownerUserId: number;
  }): Promise<Project> {
    const user = await this.userRepository.findOne({
      where: { id: data.ownerUserId },
    });

    let project = Project.create({
      name: data.name,
      description: data.description,
      url: data.url,
      iconURL: data.iconURL,
      privacyURL: data.privacyURL,
      termsURL: data.termsURL,
    });
    project = await this.projectRepository.save(project);

    const member = ProjectMember.create({
      project,
      user,
      role: 'Owner',
    });
    await this.projectMemberRepository.save(member);

    return this.findOne(project.id);
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['projectMembers', 'projectMembers.user'],
    });
    if (!project) {
      throw new ProjectNotFoundException();
    }
    return project;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      url?: string;
      iconURL?: string;
      termsURL?: string;
      privacyURL?: string;
      redirectURLs?: string[];
    },
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new ProjectNotFoundException();
    }
    await this.projectRepository.update(
      {
        id,
      },
      {
        name: data.name || project.name,
        description: data.description || project.description,
        url: data.url || project.url,
        iconURL: data.iconURL || project.iconURL,
        termsURL: data.termsURL || project.termsURL,
        privacyURL: data.privacyURL || project.privacyURL,
        redirectURLList: data.redirectURLs.join(',') || project.redirectURLList,
      },
    );
    return this.findOne(project.id);
  }

  async delete(id: number): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new ProjectNotFoundException();
    }
    await this.projectUserRepository.softDelete({
      project: { id: project.id },
    });
    await this.projectMemberRepository.softDelete({
      project: { id: project.id },
    });
    await this.projectRepository.softDelete({ id });
  }

  async isProjectMember(projectId: number, userId: number): Promise<boolean> {
    const projectMember = await this.projectMemberRepository.findOne({
      where: { project: { id: projectId }, user: { id: userId } },
    });
    return !!projectMember;
  }

  async isProjectOwner(projectId: number, userId: number): Promise<boolean> {
    const member = await this.projectMemberRepository.findOne({
      where: { project: { id: projectId }, user: { id: userId } },
    });
    return member && member.role === 'Owner';
  }

  async checkClientHasPermission(
    projectId: number,
    client: ClientType,
    role: 'Member' | 'Owner' = 'Member',
  ) {
    if (client.type === 'user' && !client.user.roles.includes('User:Admin')) {
      if (
        role === 'Member' &&
        (await this.isProjectMember(projectId, client.user.id))
      ) {
        return true;
      }

      if (
        role === 'Owner' &&
        (await this.isProjectOwner(projectId, client.user.id))
      ) {
        return true;
      }

      throw new BadRequestException({
        code: 'project_not_member',
      });
    }
    return true;
  }
}
