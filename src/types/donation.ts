export interface Donation {
  id: string;
  description: string;
  location: string;
  expiryAt: Date;
  donatorId: string;
}

export interface CreateDonationDto extends Omit<Donation, "id"> {}
export interface UpdateDonationDto extends Partial<CreateDonationDto> {}
