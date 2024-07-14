import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ValueService } from "./value.service";
import { CreateValueDto } from "./dto/create-value.dto";
import { UpdateValueDto } from "./dto/update-value.dto";
import { FindAllDto } from "src/helpers/dto";

@Controller("value")
export class ValueController {
  constructor(private readonly valueService: ValueService) {}

  @Post()
  create(@Body() createValueDto: CreateValueDto) {
    return this.valueService.create(createValueDto);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.valueService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.valueService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateValueDto: UpdateValueDto) {
    return this.valueService.update(+id, updateValueDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.valueService.remove(+id);
  }
}
