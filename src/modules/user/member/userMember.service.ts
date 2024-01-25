import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserMemberService {
  constructor(
    @InjectRepository(ProjectMember)
    private readonly userMemberRepository: Repository<ProjectMember>,
  ) {}

  async getProjectMemberByUserId(userId: number): Promise<ProjectMember[]> {
    return await this.userMemberRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['project', 'user'],
    });
  }
}
