import { Module } from "@nestjs/common";
import { ValueService } from "./value.service";
import { ValueController } from "./value.controller";

@Module({
  controllers: [ValueController],
  providers: [ValueService],
})
export class ValueModule {}
