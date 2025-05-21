import {
  Beneficiary,
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
} from "@/types/beneficiary";
import { BaseService } from "./baseService";

export const beneficiaryService = new BaseService<
  Beneficiary,
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto
>("beneficiary");
