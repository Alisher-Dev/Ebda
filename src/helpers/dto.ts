import { IsNumber, IsOptional } from "class-validator";

export class FindAllDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
