import { IsIn, IsNumber, IsString } from "class-validator";
import { DeliveryEnum, DeliveryTypeEnum } from "src/helpers/enum";

export class CreateOrderDto {
  @IsString()
  username: string;

  @IsString()
  phone_number: string;

  @IsIn(["self delivery", "deliver"])
  deliver_type: DeliveryEnum;

  @IsString()
  street: string;

  @IsNumber()
  house: number;

  @IsNumber()
  flat: number;

  @IsString()
  comment: string;

  @IsIn(["specified time", "soon"])
  time_type: DeliveryTypeEnum;

  @IsNumber()
  product_id: number;
}
