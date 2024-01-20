import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('project_user')
export class ProjectUser {
  @ManyToOne(() => Project, (project) => project.projectUsers)
  project: Project;

  @ManyToOne(() => User, (user) => user.projectUsers)
  user: User;
}
