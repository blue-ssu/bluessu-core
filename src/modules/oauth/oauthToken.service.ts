import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { ProjectUser } from 'src/entities/projectUser.entity';
import { ProjectUserToken } from 'src/entities/projectUserToken.entity';
import { Repository } from 'typeorm';

type GenerateToken = jwt.JwtPayload & {
  userId: number;
  projectId: number;
};

@Injectable()
export class OAuthTokenService {
  constructor(
    @InjectRepository(ProjectUserToken)
    private readonly projectUserTokenRepository: Repository<ProjectUserToken>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
    private readonly configService: ConfigService,
  ) {}

  generateGenerateToken(projectId: number, userId: number) {
    const token = jwt.sign(
      {
        projectId,
        userId,
      },
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '5m',
        issuer: 'core.ssu.blue',
        subject: 'generate',
      },
    );
    return token;
  }

  public verifyGenerateToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      ) as GenerateToken;

      if (decoded.iss !== 'core.ssu.blue') {
        return {
          isValid: false,
        };
      }

      if (decoded.sub !== 'generate') {
        return {
          isValid: false,
        };
      }

      return {
        isValid: true,
        payload: {
          userId: decoded.userId,
          projectId: decoded.projectId,
          issuer: decoded.iss,
          subject: decoded.sub,
        },
      };
    } catch (err) {
      return {
        isValid: false,
      };
    }
  }

  generateAccessToken(projectId: number, userId: number) {
    const token = jwt.sign(
      {
        projectId,
        userId,
      },
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '60d',
        issuer: 'core.ssu.blue',
        subject: 'oauthUserAccess',
      },
    );
    return token;
  }

  public verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      ) as GenerateToken;

      if (decoded.iss !== 'core.ssu.blue') {
        return {
          isValid: false,
        };
      }

      if (decoded.sub !== 'oauthUser') {
        return {
          isValid: false,
        };
      }

      return {
        isValid: true,
        payload: {
          userId: decoded.userId,
          projectId: decoded.projectId,
          issuer: decoded.iss,
          subject: decoded.sub,
        },
      };
    } catch (err) {
      return {
        isValid: false,
      };
    }
  }

  public async getAndGenerateRefreshToken(
    projectUser: ProjectUser,
    projectId: number,
    userId: number,
  ) {
    let token = await this.projectUserTokenRepository.findOne({
      where: {
        id: projectUser.id,
      },
    });

    if (!token) {
      const newToken = jwt.sign(
        {
          projectId,
          userId,
        },
        this.configService.get('JWT_SECRET'),
        {
          issuer: 'core.ssu.blue',
          subject: 'oauthUserRefresh',
        },
      );

      token = ProjectUserToken.create({
        projectUser,
        refreshToken: newToken,
      });
      token = await this.projectUserTokenRepository.save(token);
    }

    return {
      refreshToken: token.refreshToken,
    };
  }

  public verifyRefreshToken(refreshToken: string, projectId: number) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        this.configService.get('JWT_SECRET'),
      ) as GenerateToken;

      if (decoded.iss !== 'core.ssu.blue') {
        return {
          isValid: false,
        };
      }

      if (decoded.sub !== 'oauthUserRefresh') {
        return {
          isValid: false,
        };
      }

      const dbToken = this.projectUserTokenRepository.findOne({
        where: {
          refreshToken,
          projectUser: {
            user: {
              id: decoded.userId,
            },
            project: {
              id: projectId,
            },
          },
        },
      });

      if (!dbToken) {
        return {
          isValid: false,
        };
      }

      return {
        isValid: true,
        payload: {
          userId: decoded.userId,
          projectId: decoded.projectId,
          issuer: decoded.iss,
          subject: decoded.sub,
        },
      };
    } catch (err) {
      return {
        isValid: false,
      };
    }
  }
}
