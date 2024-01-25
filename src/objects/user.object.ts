import { User } from 'src/entities/user.entity';

export class UserObject {
  id: number;
  name: string;
  studentId: string;
  department: string;
  profileImage: string;
  roles: string[];
  createdAt: string;

  static from(user: User) {
    const userObject = new UserObject();
    userObject.id = user.id;
    userObject.name = user.name;
    userObject.studentId = user.studentId;
    userObject.department = user.department;
    userObject.profileImage = user.profileImage;
    userObject.roles = user.roles;
    userObject.createdAt = new Date(user.createdAt).toISOString();
    return userObject;
  }

  static fromArray(users: User[]) {
    return users.map((user) => this.from(user));
  }
}
