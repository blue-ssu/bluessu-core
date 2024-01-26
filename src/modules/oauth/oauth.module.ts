import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { OAuthTokenService } from './oauthToken.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { ProjectUserToken } from 'src/entities/projectUserToken.entity';

@Module({
  controllers: [OAuthController],
  providers: [OAuthService, OAuthTokenService],
  imports: [
    TypeOrmModule.forFeature([User, Project, ProjectUser, ProjectUserToken]),
  ],
})
export class OAuthModule {}
