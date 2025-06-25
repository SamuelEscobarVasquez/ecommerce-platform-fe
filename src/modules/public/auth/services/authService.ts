import api from '../../../../core/api/axios';
import { REGISTER_USER_ENDPOINT } from '../../../../services/apiPaths';
import type { RegisterResponse, RegisterRequest } from '../types';

export async function registerService(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(REGISTER_USER_ENDPOINT, data)
  return response.data
}