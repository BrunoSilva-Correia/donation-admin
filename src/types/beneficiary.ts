export interface Beneficiary {
  id: string;
  name: string;
  email: string;
  location: string;
  necessities: string;
  createdBy: string;
}

export interface CreateBeneficiaryDto extends Omit<Beneficiary, "id"> {}
export interface UpdateBeneficiaryDto extends Partial<CreateBeneficiaryDto> {}
