import { IsIn, IsString } from "class-validator";
import { FileType } from "src/helpers/types";

export class CreateMediaDto {
  @IsString()
  url: string;

  @IsIn(["image", "video"])
  type: FileType;
}
