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

  @Column()
  department: string;

  @Column({
    name: 'profile_image',
    default:
      'https://media.discordapp.net/attachments/1198637012169797662/1198642159763595315/Frame_123.png?ex=65bfa580&is=65ad3080&hm=9e99316cf9a1afe69e289c1e128d07486669bce11b38eed501bf871bb42c5649&=&format=webp&quality=lossless&width=921&height=921',
  })
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
    department: string;
    studentId: string;
    profileImage: string;
  }) {
    const entity = new User();
    entity.studentId = data.studentId;
    entity.department = data.department;
    entity.name = data.name;
    entity.profileImage = data.profileImage;
    return entity;
  }
}
