import apiClient from './axios';
import type {
  ApiResponse,
  Lead,
  LeadFilters,
  LeadFormData,
  PaginatedResponse,
} from '../types';

const buildLeadParams = (filters: LeadFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.status) {
    params.set('status', filters.status);
  }

  if (filters.source) {
    params.set('source', filters.source);
  }

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.sort) {
    params.set('sort', filters.sort);
  }

  params.set('page', String(filters.page || 1));
  params.set('limit', String(filters.limit || 10));

  return params;
};

export const fetchLeads = async (
  filters: LeadFilters
): Promise<PaginatedResponse<Lead>> => {
  const params = buildLeadParams(filters);
  const response = await apiClient.get<PaginatedResponse<Lead>>(
    `/leads?${params.toString()}`
  );

  return response.data;
};

export const fetchLeadById = async (id: string): Promise<ApiResponse<Lead>> => {
  const response = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);

  return response.data;
};

export const createLeadApi = async (
  data: LeadFormData
): Promise<ApiResponse<Lead>> => {
  const response = await apiClient.post<ApiResponse<Lead>>('/leads', data);

  return response.data;
};

export const updateLeadApi = async (
  id: string,
  data: Partial<LeadFormData>
): Promise<ApiResponse<Lead>> => {
  const response = await apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, data);

  return response.data;
};

export const deleteLeadApi = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/leads/${id}`);

  return response.data;
};
