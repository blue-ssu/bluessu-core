import { Global, Module } from '@nestjs/common';

import { SsoService } from './sso.service';
import { SsoController } from './sso.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Global()
@Module({
  controllers: [SsoController],
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [SsoService],
})
export class SsoModule {}
