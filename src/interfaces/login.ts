export interface SeccessLoginResponse {
  message: string;
  user: UserResponse;
  token: string;
}
export interface ErorrLoginResponse {
  message: string;
  StatusMsg: string;
}
export interface UserResponse {
  name: string;
  email: string;
  role: string;
}
