import { api } from './api';

interface RequestCodeResponse {
  error?: string;
}

interface VerifyCodeResponse {
  token?: string;
  error?: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  apartmentId: string;
  condominiumId: string;
  apartmentNumber: string;
  condominiumName: string;
  isAdmin?: boolean;
  condominiumAddress: {
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface ProfileResponse {
  data?: UserProfile;
  error?: string;
}

interface ToggleAdminResponse {
  isAdmin: boolean;
  message: string;
  error?: string;
}

// Funções para gerenciar o sessionStorage de forma segura
const setSecureStorage = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error('Erro ao salvar no sessionStorage:', error);
  }
};

const getSecureStorage = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error('Erro ao ler do sessionStorage:', error);
    return null;
  }
};

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
  },

  async getProfile(): Promise<ProfileResponse> {
    try {
      // Função para obter o token do cookie
      const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
      };

      const token = getCookie('authToken');
      if (!token) {
        return { error: 'Token não encontrado' };
      }

      const { data } = await api.get<UserProfile>('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Armazenar apenas os IDs no sessionStorage de forma segura
      setSecureStorage('userId', data.id);
      setSecureStorage('apartmentId', data.apartmentId);
      setSecureStorage('condominiumId', data.condominiumId);
      
      // Só atualizar isAdmin se ele existir na resposta da API e for diferente de undefined
      if (data.isAdmin !== undefined) {
        setSecureStorage('isAdmin', data.isAdmin ? 'true' : 'false');
      }

      return { data };
    } catch (error: any) {
      return {
        error: error.response?.data?.error || 'Erro ao buscar perfil do usuário'
      };
    }
  },

  async toggleAdmin(userId: string): Promise<ToggleAdminResponse> {
    try {
      const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
      };

      const token = getCookie('authToken');
      if (!token) {
        return { isAdmin: false, message: '', error: 'Token não encontrado' };
      }

      const { data } = await api.patch<ToggleAdminResponse>(`/auth/users/${userId}/toggle-admin`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Aguardar um pequeno delay para garantir que a requisição terminou
      await new Promise(resolve => setTimeout(resolve, 100));

      // Atualizar o valor no sessionStorage
      setSecureStorage('isAdmin', data.isAdmin ? 'true' : 'false');

      return data;
    } catch (error: any) {
      return {
        isAdmin: false,
        message: '',
        error: error.response?.data?.error || 'Erro ao alterar status de administrador'
      };
    }
  },

  // Funções auxiliares para acessar os IDs armazenados
  getUserId(): string | null {
    return getSecureStorage('userId');
  },

  getApartmentId(): string | null {
    return getSecureStorage('apartmentId');
  },

  getCondominiumId(): string | null {
    return getSecureStorage('condominiumId');
  },

  isAdmin(): boolean {
    const value = getSecureStorage('isAdmin');
    console.log('isAdmin() - Valor no sessionStorage:', value);
    const result = value === 'true';
    console.log('isAdmin() - Retornando:', result);
    return result;
  },

  // Função para limpar dados do sessionStorage
  clearUserData(): void {
    try {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('apartmentId');
      sessionStorage.removeItem('condominiumId');
      sessionStorage.removeItem('isAdmin');
    } catch (error) {
      console.error('Erro ao limpar dados do sessionStorage:', error);
    }
  }
}; 