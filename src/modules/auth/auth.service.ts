import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getProjectById(id: number) {
    return await this.projectRepository.findOne({
      where: { id },
    });
  }
}
