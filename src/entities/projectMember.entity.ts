import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @Column({ name: 'role', default: 'Member' })
  role: string;

  static create(data: {
    project: Project;
    user: User;
    role: 'Member' | 'Owner';
  }) {
    const entity = new ProjectMember();
    entity.project = data.project;
    entity.user = data.user;
    entity.role = data.role;
    return entity;
  }
}
