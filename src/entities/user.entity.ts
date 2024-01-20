import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProjectMember } from './projectMember.entity';
import { UserPermission } from './userPermission.entity';
import { Project } from './project.entity';
import { ProjectUser } from './projectUser.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ length: 32 })
  name: string;

  @Column({ name: 'profile_image' })
  profileImage: string;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.user)
  projectMembers: ProjectMember[];

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.user)
  projectUsers: Project[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  permissions: UserPermission[];

  static create(data: { name: string; profileImage: string }) {
    const entity = new User();
    entity.name = data.name;
    entity.profileImage = data.profileImage;
    return entity;
  }
}
