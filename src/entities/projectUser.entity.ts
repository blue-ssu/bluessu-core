import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { BaseEntity } from './base.entity';
import { ProjectUserToken } from './projectUserToken.entity';

@Entity('project_user')
export class ProjectUser extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.projectUsers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.projectUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ProjectUserToken,
    (projectUserToken) => projectUserToken.projectUser,
  )
  projectUserTokens: ProjectUserToken[];

  static create(data: { project: Project; user: User }) {
    const entity = new ProjectUser();
    entity.project = data.project;
    entity.user = data.user;
    return entity;
  }
}
