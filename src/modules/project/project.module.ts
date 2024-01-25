import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { ProjectMemberModule } from './modules/member/member.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([User, Project, ProjectMember, ProjectUser]),
    ProjectMemberModule,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
