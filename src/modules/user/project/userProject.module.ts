import { Module } from '@nestjs/common';
import { UserProjectController } from './userProject.controller';
import { UserProjectService } from './userProject.service';
import { UserService } from '../user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [UserProjectController],
  providers: [UserProjectService, UserService],
  imports: [TypeOrmModule.forFeature([ProjectUser, User])],
})
export class UserProjectModule {}
