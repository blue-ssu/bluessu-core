import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { AuthService } from '../auth.service';
import { UserNotFoundException } from 'src/errors';
import { ProjectNotFoundException } from 'src/errors/ProjectNotFoundException';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles =
      this.reflector.get<string[]>('roles', context.getClass()) ||
      this.reflector.get<string[]>('roles', context.getHandler());
    return this.validateRequest(request, roles);
  }

  private async validateRequest(request: Request, roles: string[]) {
    const JWTString = request.headers.authorization?.split('Bearer ')[1];
    const res = this.tokenService.verifyToken(JWTString);

    if (res.isValid === false) {
      throw new BadRequestException({
        code: 'invalid_token',
      });
    }

    if (res.payload.subject === 'user') {
      const user = await this.authService.getUserById(+res.payload.id);
      if (!user) {
        throw new UserNotFoundException();
      }

      if (!roles.some((role) => user.roles.includes(role))) {
        throw new ForbiddenException({
          code: 'invalid_role',
        });
      }
      request.client = {
        type: 'user',
        user: {
          id: +res.payload.id,
          roles: user.roles,
        },
      };
    }

    if (res.payload.subject === 'project') {
      const project = await this.authService.getProjectById(+res.payload.id);
      if (!project) {
        throw new ProjectNotFoundException();
      }
      if (!roles.some((role) => project.roles.includes(role))) {
        throw new ForbiddenException({
          code: 'invalid_role',
        });
      }
      request.client = {
        type: 'project',
        project: {
          id: +res.payload.id,
          roles: project.roles,
        },
      };
    }

    return true;
  }
}
