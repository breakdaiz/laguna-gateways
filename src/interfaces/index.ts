export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export interface IServerActionResponse {
  success: boolean;
  message: string;
  data?: any | null;
}
