import { Module } from "@nestjs/common";
import { ValueService } from "./value.service";
import { ValueController } from "./value.controller";
import { AttributeService } from "../attribute/attribute.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Value } from "./entities/value.entity";
import { Attribute } from "../attribute/entities/attribute.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Value, Attribute])],
  controllers: [ValueController],
  providers: [ValueService, AttributeService],
})
export class ValueModule {}
