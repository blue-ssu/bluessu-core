import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      client?:
        | {
            type: 'user';
            user: {
              id: number;
              roles: string[];
            };
          }
        | {
            type: 'project';
            project: {
              id: number;
              roles: string[];
            };
          };
    }

    interface Response {
      sse?: any;
    }
  }
}
