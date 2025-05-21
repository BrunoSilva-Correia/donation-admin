import api from "./api";
import { User, UpdateUserDto, CreateUserDto } from "@/types/user";
import { BaseService } from "./baseService";

class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  async getByEmail(email: string): Promise<User> {
    const response = await api.get<User>(`/user/by-email?email=${email}`);
    return response.data;
  }
}

export const userService = new UserService("user");
