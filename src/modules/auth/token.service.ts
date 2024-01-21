import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

type UserToken = jwt.JwtPayload & {
  id: string;
};

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  public generateUserToken(userId: number) {
    const token = jwt.sign(
      {
        id: userId,
      },
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '7d',
        issuer: 'core.ssu.blue',
        subject: 'user',
      },
    );
    return token;
  }

  public generateProjectToken(projectId: number) {
    const token = jwt.sign(
      {
        id: projectId,
      },
      this.configService.get('JWT_SECRET'),
      {
        issuer: 'core.ssu.blue',
        subject: 'project',
      },
    );
    return token;
  }

  public verifyToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      ) as UserToken;

      if (decoded.iss !== 'core.ssu.blue') {
        return {
          isValid: false,
        };
      }

      if (decoded.sub !== 'user' && decoded.sub !== 'project') {
        return {
          isValid: false,
        };
      }

      return {
        isValid: true,
        payload: {
          id: decoded.id,
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
