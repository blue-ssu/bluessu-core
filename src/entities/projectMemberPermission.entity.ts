import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProjectMember } from './projectMember.entity';

@Entity('project_member_permission')
export class ProjectMemberPermission extends BaseEntity {
  @ManyToOne(() => ProjectMember, (projectMember) => projectMember.permissions)
  @JoinColumn({ name: 'project_member_id' })
  projectMember: ProjectMember;

  @Column({ name: 'permission_name' })
  permissionName: string;
}
