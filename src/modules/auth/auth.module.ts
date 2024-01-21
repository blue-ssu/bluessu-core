import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { SsoModule } from './modules/sso/sso.module';

@Global()
@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([User, Project]), SsoModule],
  providers: [AuthService, TokenService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
