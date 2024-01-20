import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity('project_permission')
export class ProjectPermission extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.permissions)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
