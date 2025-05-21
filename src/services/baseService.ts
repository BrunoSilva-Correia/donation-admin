import api from "./api";

export class BaseService<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  constructor(private readonly resource: string) {}

  async getAll(): Promise<T[]> {
    const response = await api.get<T[]>(`/${this.resource}`);
    return response.data;
  }

  async getById(id: string): Promise<T> {
    const response = await api.get<T>(`/${this.resource}/${id}`);
    return response.data;
  }

  async create(data: CreateDto): Promise<T> {
    const response = await api.post<T>(`/${this.resource}`, data);
    return response.data;
  }

  async update(id: string, data: UpdateDto): Promise<T> {
    const response = await api.patch<T>(`/${this.resource}/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/${this.resource}/${id}`);
  }
}
