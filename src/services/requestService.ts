import { Request, CreateRequestDto, UpdateRequestDto } from "@/types/request";
import { BaseService } from "./baseService";

export const requestService = new BaseService<
  Request,
  CreateRequestDto,
  UpdateRequestDto
>("request");
