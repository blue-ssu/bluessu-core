import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      code: 'user_not_found',
      message: '유저를 찾을 수 없습니다.',
    });
  }
}
