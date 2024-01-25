import { ProjectUser } from 'src/entities/projectUser.entity';
import { ProjectObject } from './project.object';

export class ProjectUserObject {
  id: number;
  project: ProjectObject;

  static from(projectUser: ProjectUser) {
    const projectUserObject = new ProjectUserObject();
    projectUserObject.id = projectUser.id;
    projectUserObject.project = ProjectObject.from(projectUser.project);
    return projectUserObject;
  }

  static fromArray(projectUsers: ProjectUser[]) {
    return projectUsers.map((projectUser) => this.from(projectUser));
  }
}
