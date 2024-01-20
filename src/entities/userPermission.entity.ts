import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('user_permission')
export class UserPermission extends BaseEntity {
  @ManyToOne(() => User, (user) => user.permissions)
  user: User;
}
