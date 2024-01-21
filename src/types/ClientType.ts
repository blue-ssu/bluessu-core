export type ClientUser = {
  type: 'user';
  user: {
    id: number;
    roles: string[];
  };
};

export type ClientProject = {
  type: 'project';
  project: {
    id: number;
    roles: string[];
  };
};

export type ClientType = ClientUser | ClientProject;
