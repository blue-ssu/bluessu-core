export type Action = {
  name: string;
  type: 'read' | 'write';
  description: string;
};
