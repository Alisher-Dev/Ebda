import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateProductDto {
  @MinLength(6)
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsNumber()
  price: number;

  @IsNumber()
  media_id: number;
}
