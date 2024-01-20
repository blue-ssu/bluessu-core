import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { BaseEntity } from './base.entity';

@Entity('project_user')
export class ProjectUser extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.projectUsers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.projectUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
