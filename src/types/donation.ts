export interface Donation {
  id: string;
  description: string;
  location: string;
  expiryAt: Date;
  donatorId: string;
}

export type CreateDonationDto = Omit<Donation, "id">;
export type UpdateDonationDto = Partial<CreateDonationDto>;
