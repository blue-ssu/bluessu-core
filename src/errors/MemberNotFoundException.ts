import { NotFoundException } from '@nestjs/common';

export class MemberNotFoundException extends NotFoundException {
  constructor() {
    super({
      code: 'member_not_found',
      message: '멤버를 찾을 수 없습니다.',
    });
  }
}
