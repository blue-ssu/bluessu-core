import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { User } from 'src/entities/user.entity';
import { ProjectNotFoundException, UserNotFoundException } from 'src/errors';
import { MemberNotFoundException } from 'src/errors/MemberNotFoundException';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProjectMember)
    private readonly projectMemberRepository: Repository<ProjectMember>,
  ) {}

  async findOne(projectId: number, memberId: number): Promise<ProjectMember> {
    const projectMember = await this.projectMemberRepository.findOne({
      where: {
        id: memberId,
        project: {
          id: projectId,
        },
      },
      relations: ['user'],
    });
    if (!projectMember) {
      throw new MemberNotFoundException();
    }
    return projectMember;
  }

  async findAll(projectId: number): Promise<ProjectMember[]> {
    const projectMembers = await this.projectMemberRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: ['user'],
    });
    return projectMembers;
  }

  async addMember(projectId: number, userId: number): Promise<ProjectMember> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    let projectMember = ProjectMember.create({
      project,
      user,
      role: 'Member',
    });
    projectMember = await this.projectMemberRepository.save(projectMember);

    return this.findOne(projectId, projectMember.id);
  }

  async removeMember(projectId: number, memberId: number) {
    const member = await this.findOne(projectId, memberId);
    if (member.role === 'Owner') {
      throw new BadRequestException({
        code: 'cannot_remove_owner',
      });
    }

    await this.projectMemberRepository.softDelete({
      id: memberId,
    });
  }

  async updateMemberRole(
    projectId: number,
    memberId: number,
    role: 'Member' | 'Owner',
  ): Promise<ProjectMember> {
    const member = await this.findOne(projectId, memberId);

    if (!member) {
      throw new MemberNotFoundException();
    }

    const ownerMembers = await this.projectMemberRepository.find({
      where: {
        project: {
          id: projectId,
        },
        role: 'Owner',
      },
    });

    if (
      role !== 'Owner' &&
      ownerMembers.length <= 1 &&
      ownerMembers[0].id === memberId
    ) {
      throw new BadRequestException({
        code: 'cannot_remove_last_owner',
      });
    }

    await this.projectMemberRepository.update(
      {
        id: memberId,
      },
      {
        role,
      },
    );

    return await this.findOne(projectId, memberId);
  }
}
