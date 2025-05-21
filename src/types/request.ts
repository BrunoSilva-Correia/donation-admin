import { RequestEnum } from "@/enums/requestStatusEnum";

export type Request = {
  id: string;
  donationId: string;
  beneficiaryId: string;
  status: RequestEnum;
};

export type CreateRequestDto = Omit<Request, "id">;
export type UpdateRequestDto = Partial<CreateRequestDto>;
