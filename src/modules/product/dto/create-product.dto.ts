import { MinLength } from "class-validator";

export class CreateProductDto {
  @MinLength(6)
  title: string;
}
