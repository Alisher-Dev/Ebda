import { IsInt, IsNumber, IsString, MinLength } from "class-validator";
import { Category } from "src/modules/category/entities/category.entity";

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

  @IsInt()
  category_id: number;
}
