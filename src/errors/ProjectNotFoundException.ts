import { NotFoundException } from '@nestjs/common';

export class ProjectNotFoundException extends NotFoundException {
  constructor() {
    super({
      code: 'project_not_found',
      message: '프로젝트를 찾을 수 없습니다.',
    });
  }
}
