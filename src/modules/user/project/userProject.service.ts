import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(ProjectUser)
    private readonly userProjectRepository: Repository<ProjectUser>,
  ) {}

  async getProjectUserByUserId(userId: number): Promise<ProjectUser[]> {
    return await this.userProjectRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['project'],
    });
  }
}
