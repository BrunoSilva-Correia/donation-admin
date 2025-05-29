export interface Beneficiary {
  id: string;
  name: string;
  email: string;
  location: string;
  necessities: string;
  createdBy: string;
}

export type CreateBeneficiaryDto = Omit<Beneficiary, "id">;
export type UpdateBeneficiaryDto = Partial<CreateBeneficiaryDto>;
