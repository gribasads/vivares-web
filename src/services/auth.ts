import { api } from './api';

interface RequestCodeResponse {
  error?: string;
}

interface VerifyCodeResponse {
  token?: string;
  error?: string;
}

export const authService = {
  async requestCode(email: string): Promise<RequestCodeResponse> {
    try {
      const { data } = await api.post<RequestCodeResponse>('/auth/request-code', { email });
      return data;
    } catch (error: any) {
      return {
        error: error.response?.data?.error || 'Erro ao solicitar código'
      };
    }
  },

  async verifyCode(email: string, code: string): Promise<VerifyCodeResponse> {
    try {
      const { data } = await api.post<VerifyCodeResponse>('/auth/verify-code', { email, code });
      return data;
    } catch (error: any) {
      return {
        error: error.response?.data?.error || 'Erro ao verificar código'
      };
    }
  }
}; 