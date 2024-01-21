import { Body, Controller, Post } from '@nestjs/common';
import { SsoService } from './sso.service';
import { SsoLoginReqDto } from './dto/SsoLogin.req.dto';

@Controller('auth/sso')
export class SsoController {
  constructor(private readonly ssoService: SsoService) {}

  @Post('')
  async login(@Body() dto: SsoLoginReqDto) {
    return await this.ssoService.signIn(dto.sToken);
  }
}
