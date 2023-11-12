export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginResponse {
  access_token: string;
}

export interface Project {
  id: number;
  name: string;

  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}
export interface Task {
  id: number;
  projectId: number;
  name: string;
  status: TaskStatus;
}
