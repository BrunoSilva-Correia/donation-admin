import { ApiResponse } from "@/types/api";
import api from "./api";
import { LoginCredentials, AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      return {
        success: true,
        data: {
          accessToken: data.accessToken,
        },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
        };
      }
      return {
        success: false,
      };
    }
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },
};
