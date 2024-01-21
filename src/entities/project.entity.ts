import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProjectMember } from './projectMember.entity';
import { ProjectUser } from './projectUser.entity';

@Entity('project')
export class Project extends BaseEntity {
  @Column({ length: 32 })
  name: string;

  @Column()
  description: string;

  @Column()
  uri: string;

  @Column({ name: 'role_list', default: 'Project' })
  roleList: string;

  get roles() {
    return this.roleList.split(',').map((role) => role.trim());
  }

  @Column({ name: 'icon_url' })
  iconURL: string;

  @Column({ name: 'terms_url', nullable: true })
  termsURL: string;

  @Column({ name: 'privacy_url', nullable: true })
  privacyURL: string;

  @Column({ name: 'client_id' })
  clientID: string;

  @Column({ name: 'client_secret', nullable: true })
  clientSecret: string;

  @Column({ name: 'redirect_urls', nullable: true })
  redirectURLs: string;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
  projectMembers: ProjectMember[];

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  projectUsers: ProjectUser[];

  static create(data: {
    name: string;
    description: string;
    uri: string;
    iconURL: string;
  }) {
    const entity = new Project();
    entity.name = data.name;
    entity.description = data.description;
    entity.uri = data.uri;
    entity.iconURL = data.iconURL;
    return entity;
  }
}
