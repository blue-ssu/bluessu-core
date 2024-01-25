import { Project } from 'src/entities/project.entity';

export class ProjectObject {
  id: number;
  name: string;
  description: string;
  url?: string;
  roles: string[];
  iconURL: string;
  termsURL?: string;
  privacyURL?: string;
  createdAt: string;

  static from(project: Project) {
    const projectObject = new ProjectObject();
    projectObject.id = project.id;
    projectObject.name = project.name;
    projectObject.description = project.description;
    projectObject.url = project.url;
    projectObject.roles = project.roles;
    projectObject.iconURL = project.iconURL;
    projectObject.termsURL = project.termsURL;
    projectObject.privacyURL = project.privacyURL;
    projectObject.createdAt = new Date(project.createdAt).toISOString();
    return projectObject;
  }

  static fromArray(projects: Project[]) {
    return projects.map((project) => this.from(project));
  }
}
