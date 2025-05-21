export interface Donator {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdBy: string;
}

export interface CreateDonatorDto extends Omit<Donator, "id"> {}
export interface UpdateDonatorDto extends Partial<CreateDonatorDto> {}
