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
