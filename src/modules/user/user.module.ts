import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserProjectModule } from './project/userProject.module';
import { UserMemberModule } from './member/userMember.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserProjectModule,
    UserMemberModule,
  ],
  exports: [UserService],
})
export class UserModule {}
