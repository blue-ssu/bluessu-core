import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity('project_permission')
export class ProjectPermission extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.permissions)
  project: Project;
}
