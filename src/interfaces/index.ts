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

export interface IPackage {
  id: string;
  created_at: string;
  name: string;
  small_description: string;
  full_description: string;
  start_date_time: string;
  end_date_time: string;
  duration: string;
  capacity: number;
  price_per_member: number;
  guide_name: string;
  guide_mobile_number: string;
  images: string[];
  status: string;
  is_active: boolean;
}
