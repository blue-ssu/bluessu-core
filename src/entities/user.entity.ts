import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProjectMember } from './projectMember.entity';
import { Project } from './project.entity';
import { ProjectUser } from './projectUser.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ length: 32 })
  name: string;

  @Column({ unique: true, name: 'student_id' })
  studentId: string;

  @Column({ name: 'profile_image' })
  profileImage: string;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.user)
  projectMembers: ProjectMember[];

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.user)
  projectUsers: Project[];

  @Column({ name: 'role_list', default: 'User' })
  roleList: string;

  get roles() {
    return this.roleList.split(',').map((role) => role.trim());
  }

  static create(data: {
    name: string;
    studentId: string;
    profileImage: string;
  }) {
    const entity = new User();
    entity.studentId = data.studentId;
    entity.name = data.name;
    entity.profileImage = data.profileImage;
    return entity;
  }
}
