export interface Donator {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdBy: string;
}

export type CreateDonatorDto = Omit<Donator, "id">;
export type UpdateDonatorDto = Partial<CreateDonatorDto>;
