import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';
import { ProjectMemberPermission } from './projectMemberPermission.entity';

@Entity('project_member')
export class ProjectMember extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.projectMembers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.projectMembers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'is_leader', default: false, type: 'boolean' })
  isLeader: boolean;

  @OneToMany(
    () => ProjectMemberPermission,
    (permission) => permission.projectMember,
  )
  permissions: ProjectMemberPermission[];

  static create(data: { project: Project; user: User; isLeader: boolean }) {
    const entity = new ProjectMember();
    entity.project = data.project;
    entity.user = data.user;
    entity.isLeader = data.isLeader;
    return entity;
  }
}
