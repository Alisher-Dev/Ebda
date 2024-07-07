import { IsInt, IsString } from "class-validator";

export class CreateValueDto {
  @IsInt()
  attribute_id: number;

  @IsString()
  value: string;
}
