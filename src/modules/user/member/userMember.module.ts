import { Module } from '@nestjs/common';
import { UserMemberController } from './userMember.controller';
import { UserService } from '../user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserMemberService } from './userMember.service';
import { ProjectMember } from 'src/entities/projectMember.entity';

@Module({
  controllers: [UserMemberController],
  providers: [UserMemberService, UserService],
  imports: [TypeOrmModule.forFeature([ProjectMember, User])],
})
export class UserMemberModule {}
