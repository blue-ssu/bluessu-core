import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProjectMember } from './projectMember.entity';
import { ProjectUser } from './projectUser.entity';
import { ProjectPermission } from './projectPermission.entity';

@Entity('project')
export class Project extends BaseEntity {
  @Column({ length: 32 })
  name: string;

  @Column()
  description: string;

  @Column()
  uri: string;

  @Column({ name: 'icon_url' })
  iconURL: string;

  @Column({ name: 'terms_url' })
  termsURL: string;

  @Column({ name: 'privacy_url' })
  privacyURL: string;

  @Column({ name: 'client_id' })
  clientID: string;

  @Column({ name: 'client_secret', nullable: true })
  clientSecret: string;

  @Column({ name: 'redirect_urls', nullable: true })
  redirectURLs: string;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
  @JoinColumn({ name: 'project_members' })
  projectMembers: ProjectMember[];

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  @JoinColumn({ name: 'project_users' })
  projectUsers: ProjectUser[];

  @OneToMany(() => ProjectPermission, (permission) => permission.project)
  @JoinColumn({ name: 'permissions' })
  permissions: ProjectPermission[];
}
