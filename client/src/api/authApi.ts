import apiClient from './axios';
import type {
  ApiResponse,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '../types';

export const loginApi = async (
  data: LoginPayload
): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);

  return response.data;
};

export const registerApi = async (
  data: RegisterPayload
): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    '/auth/register',
    data
  );

  return response.data;
};
