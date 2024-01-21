import { BadRequestException } from '@nestjs/common';

export class InvalidClientType extends BadRequestException {
  constructor() {
    super({
      code: 'invalid_client_type',
      message: '잘못된 클라이언트 타입입니다.',
    });
  }
}
