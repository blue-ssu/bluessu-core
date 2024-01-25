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

  @Column({ nullable: true })
  url: string;

  @Column({ name: 'role_list', default: 'Project' })
  roleList: string;

  get roles() {
    return this.roleList.split(',').map((role) => role.trim());
  }

  @Column({
    name: 'icon_url',
    default:
      'https://media.discordapp.net/attachments/1198637012169797662/1198642159763595315/Frame_123.png?ex=65bfa580&is=65ad3080&hm=9e99316cf9a1afe69e289c1e128d07486669bce11b38eed501bf871bb42c5649&=&format=webp&quality=lossless&width=921&height=921',
  })
  iconURL: string;

  @Column({ name: 'terms_url', nullable: true })
  termsURL: string;

  @Column({ name: 'privacy_url', nullable: true })
  privacyURL: string;

  @Column({ name: 'client_id', nullable: true })
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
    url: string;
    iconURL: string;
  }) {
    const entity = new Project();
    entity.name = data.name;
    entity.description = data.description;
    entity.url = data.url;
    entity.iconURL = data.iconURL;
    return entity;
  }
}
