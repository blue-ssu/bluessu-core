import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OAuthAuthReqDto } from './dto/OAuthAuth.req.dto';
import { Client, Role } from '../auth';
import { ClientType } from 'src/types/ClientType';
import { InvalidClientType } from 'src/errors/InvalidClientType';
import { OAuthTokenReqDto } from './dto/OAuthToken.req.dto';
import { OAuthRefreshReqDto } from './dto/OAuthRefresh.req.dto';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('projects/:clientId')
  async getProject(
    @Param('clientId') clientId: string,
    @Query('redirectURL') redirectURL: string,
  ) {
    const project = await this.oauthService.getProject(clientId, redirectURL);
    return {
      project,
    };
  }

  @Post('auth')
  @Role(['User', 'User:Admin'])
  async oauthAuth(@Body() dto: OAuthAuthReqDto, @Client() client: ClientType) {
    if (client.type !== 'user') {
      throw new InvalidClientType();
    }
    const code = await this.oauthService.oauthAuth(
      dto.clientId,
      dto.redirectURL,
      client.user.id,
    );
    return {
      code,
    };
  }

  @Post('token')
  async oauthToken(@Body() dto: OAuthTokenReqDto) {
    const token = await this.oauthService.oauthToken(dto.code, {
      clientId: dto.clientId,
      clientSecret: dto.clientSecret,
    });
    return {
      token,
    };
  }

  @Post('refresh')
  async oauthRefresh(@Body() dto: OAuthRefreshReqDto) {
    const res = await this.oauthService.refreshAccessToken(dto.refreshToken, {
      clientId: dto.clientId,
      clientSecret: dto.clientSecret,
    });
    return res;
  }

  @Get('profile')
  async oauthProfile(@Headers('Authorization') accessToken: string) {
    const res = await this.oauthService.getProfile(accessToken.split(' ')?.[1]);
    return res;
  }
}
