import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProjectUser } from './projectUser.entity';

@Entity('project_user_token')
export class ProjectUserToken extends BaseEntity {
  @ManyToOne(() => ProjectUser, (projectUser) => projectUser.projectUserTokens)
  projectUser: ProjectUser;

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  static create(data: { projectUser: ProjectUser; refreshToken: string }) {
    const entity = new ProjectUserToken();
    entity.projectUser = data.projectUser;
    entity.refreshToken = data.refreshToken;
    return entity;
  }
}
