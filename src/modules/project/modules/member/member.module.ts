import { Module } from '@nestjs/common';
import { ProjectMemberController } from './member.controller';
import { ProjectService } from '../../project.service';
import { ProjectMemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [ProjectMemberController],
  providers: [ProjectService, ProjectMemberService],
  imports: [
    TypeOrmModule.forFeature([Project, ProjectMember, ProjectUser, User]),
  ],
})
export class ProjectMemberModule {}
