import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('project_member')
export class ProjectMember extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.projectMembers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.projectMembers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
