import { Module } from "@nestjs/common";
import { AttributeService } from "./attribute.service";
import { AttributeController } from "./attribute.controller";
import { ValueModule } from "../value/value.module";

@Module({
  imports: [ValueModule],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
