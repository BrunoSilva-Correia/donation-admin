import {
  Donation,
  CreateDonationDto,
  UpdateDonationDto,
} from "@/types/donation";
import { BaseService } from "./baseService";

export const donationService = new BaseService<
  Donation,
  CreateDonationDto,
  UpdateDonationDto
>("donation");
