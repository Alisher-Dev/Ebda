import { IsIn, IsString } from "class-validator";

export class CreateMediaDto {
  @IsString()
  url: string;

  @IsIn(["video", "image"])
  type: "video" | "image";
}
