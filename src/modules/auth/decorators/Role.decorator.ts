import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';

export const Role = (roles: string[]) => {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RoleGuard));
};
