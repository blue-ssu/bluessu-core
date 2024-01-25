import { ProjectMember } from 'src/entities/projectMember.entity';
import { UserObject } from './user.object';
import { ProjectObject } from './project.object';

export class MemberObject {
  id: number;
  name: string;
  profileImage: string;
  role: string;
  user: UserObject;
  project?: ProjectObject;
  createdAt: string;

  static from(member: ProjectMember) {
    const memberObject = new MemberObject();
    memberObject.id = member.id;
    memberObject.name = member.user.name;
    memberObject.profileImage = member.user.profileImage;
    memberObject.role = member.role;
    memberObject.user = UserObject.from(member.user);
    memberObject.project = member.project && ProjectObject.from(member.project);
    memberObject.createdAt = new Date(member.createdAt).toISOString();
    return memberObject;
  }

  static fromArray(members: ProjectMember[]) {
    return members.map((member) => this.from(member));
  }
}
