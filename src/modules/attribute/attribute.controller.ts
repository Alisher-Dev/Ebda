import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { AttributeService } from "./attribute.service";
import { CreateAttributeDto } from "./dto/create-attribute.dto";
import { UpdateAttributeDto } from "./dto/update-attribute.dto";
import { FindAllDto } from "src/helpers/dto";

@Controller("attribute")
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributeService.create(createAttributeDto);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.attributeService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.attributeService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAttributeDto: UpdateAttributeDto) {
    return this.attributeService.update(+id, updateAttributeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.attributeService.remove(+id);
  }
}
