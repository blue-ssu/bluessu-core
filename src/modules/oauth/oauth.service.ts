import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ProjectNotFoundException } from 'src/errors';
import { OAuthTokenService } from './oauthToken.service';
import { ProjectUser } from 'src/entities/projectUser.entity';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
    private readonly oAuthTokenService: OAuthTokenService,
  ) {}

  async getProject(clientId: string, redirectUrl: string) {
    const project = await this.projectRepository.findOne({
      where: { clientId },
    });
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const isValidateRedirectUrl = project.redirectURLs.includes(redirectUrl);

    return {
      name: project.name,
      iconURL: project.iconURL,
      termsURL: project.termsURL,
      privacyURL: project.privacyURL,
      oAuthStatus: project.oAuthStatus,
      isValidateRedirectUrl,
    };
  }

  async oauthAuth(clientId: string, redirectURL: string, userId: number) {
    const project = await this.projectRepository.findOne({
      where: { clientId },
    });

    if (!project) {
      throw new ProjectNotFoundException();
    }

    if (project.oAuthStatus === 'Inactive') {
      throw new BadRequestException({
        code: 'oauth_inactive',
      });
    }

    if (!project.redirectURLs.includes(redirectURL)) {
      throw new BadRequestException({
        code: 'invalid_redirect_url',
      });
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const code = this.oAuthTokenService.generateGenerateToken(
      project.id,
      user.id,
    );

    return code;
  }

  async oauthToken(
    code: string,
    client: {
      clientId: string;
      clientSecret: string;
    },
  ) {
    const project = await this.projectRepository.findOne({
      where: { clientId: client.clientId },
    });

    if (project.oAuthStatus === 'Inactive') {
      throw new BadRequestException({
        code: 'oauth_inactive',
      });
    }

    if (!project) {
      throw new ProjectNotFoundException();
    }

    if (project.clientSecret !== client.clientSecret) {
      throw new BadRequestException({
        code: 'invalid_client_secret',
      });
    }

    const decoded = this.oAuthTokenService.verifyGenerateToken(code);
    if (!decoded.isValid) {
      throw new BadRequestException({
        code: 'invalid_token',
      });
    }

    const user = await this.userRepository.findOne({
      where: { id: decoded.payload.userId },
    });

    const projectUser = await this.getAndCreateProjectUser(project, user);
    const refreshToken =
      await this.oAuthTokenService.getAndGenerateRefreshToken(
        projectUser,
        project.id,
        user.id,
      );
    const accessToken = this.oAuthTokenService.generateAccessToken(
      project.id,
      user.id,
    );

    return {
      accessToken,
      refreshToken: refreshToken.refreshToken,
    };
  }

  async refreshAccessToken(
    refreshToken: string,
    client: {
      clientId: string;
      clientSecret: string;
    },
  ) {
    const project = await this.projectRepository.findOne({
      where: { clientId: client.clientId },
    });

    if (project.oAuthStatus === 'Inactive') {
      throw new BadRequestException({
        code: 'oauth_inactive',
      });
    }

    if (!project) {
      throw new ProjectNotFoundException();
    }

    if (project.clientSecret !== client.clientSecret) {
      throw new BadRequestException({
        code: 'invalid_client_secret',
      });
    }

    const decoded = this.oAuthTokenService.verifyRefreshToken(
      refreshToken,
      project.id,
    );
    if (!decoded.isValid) {
      throw new BadRequestException({
        code: 'invalid_token',
      });
    }

    const projectUser = await this.projectUserRepository.findOne({
      where: {
        project: {
          id: decoded.payload.projectId,
        },
        user: {
          id: decoded.payload.userId,
        },
      },
    });

    if (!projectUser) {
      throw new BadRequestException({
        code: 'invalid_token',
      });
    }

    const accessToken = this.oAuthTokenService.generateAccessToken(
      project.id,
      projectUser.user.id,
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  async getProfile(accessToken: string) {
    const decoded = this.oAuthTokenService.verifyAccessToken(accessToken);
    if (!decoded.isValid) {
      throw new BadRequestException({
        code: 'invalid_token',
      });
    }
    const user = await this.userRepository.findOne({
      where: { id: decoded.payload.userId },
    });

    return {
      name: user.name,
      studentId: user.studentId,
      department: user.department,
      profileImage: user.profileImage,
    };
  }

  private async getAndCreateProjectUser(project: Project, user: User) {
    let projectUser = await this.projectUserRepository.findOne({
      where: {
        project: {
          id: project.id,
        },
        user: {
          id: user.id,
        },
      },
    });

    if (!projectUser) {
      projectUser = ProjectUser.create({
        project,
        user,
      });
      projectUser = await this.projectUserRepository.save(projectUser);
    }

    return projectUser;
  }
}
