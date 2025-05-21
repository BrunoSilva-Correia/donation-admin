import { Donator, CreateDonatorDto, UpdateDonatorDto } from "@/types/donator";
import { BaseService } from "./baseService";

export const donatorService = new BaseService<
  Donator,
  CreateDonatorDto,
  UpdateDonatorDto
>("donator");
