import { Action } from '../action.type';

export const CoreActions: Action[] = [
  {
    name: 'Core:CreateUser',
    type: 'write',
    description: '새로운 유저를 생성합니다',
  },
  {
    name: 'Core:GetUser',
    type: 'read',
    description: '유저를 조회합니다',
  },
  {
    name: 'Core:ListUser',
    type: 'read',
    description: '유저 목록을 조회합니다',
  },
  {
    name: 'Core:UpdateUser',
    type: 'write',
    description: '유저를 수정합니다',
  },
  {
    name: 'Core:DeleteUser',
    type: 'write',
    description: '유저를 삭제합니다',
  },
  {
    name: 'Core:AuthenticationUserFromSSO',
    type: 'write',
    description: 'SSO로부터 유저를 인증합니다',
  },
  {
    name: 'Core:GenerateUserToken',
    type: 'write',
    description: '유저 토큰을 생성합니다',
  },
  {
    name: 'Core:CreateProject',
    type: 'write',
    description: '새로운 프로젝트를 생성합니다',
  },
  {
    name: 'Core:GetProject',
    type: 'read',
    description: '프로젝트를 조회합니다',
  },
  {
    name: 'Core:ListProject',
    type: 'read',
    description: '프로젝트 목록을 조회합니다',
  },
  {
    name: 'Core:UpdateProject',
    type: 'write',
    description: '프로젝트를 수정합니다',
  },
  {
    name: 'Core:DeleteProject',
    type: 'write',
    description: '프로젝트를 삭제합니다',
  },
  {
    name: 'Core:AddMemberToProject',
    type: 'write',
    description: '프로젝트에 멤버를 추가합니다',
  },
  {
    name: 'Core:RemoveMemberFromProject',
    type: 'write',
    description: '프로젝트에서 멤버를 제거합니다',
  },
  {
    name: 'Core:GenerateProjectClientSecret',
    type: 'write',
    description: '프로젝트 클라이언트 시크릿을 생성합니다',
  },
  {
    name: 'Core:ChangeProjectOwner',
    type: 'write',
    description: '프로젝트의 소유자를 변경합니다',
  },
  {
    name: 'Core:ListAction',
    type: 'read',
    description: 'Action 목록을 조회합니다',
  },
];
