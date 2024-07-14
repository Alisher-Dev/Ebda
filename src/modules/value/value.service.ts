import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateValueDto } from "./dto/create-value.dto";
import { UpdateValueDto } from "./dto/update-value.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Value } from "./entities/value.entity";
import { Repository } from "typeorm";
import { AttributeService } from "../attribute/attribute.service";
import { apiResponse } from "src/helpers/apiResponse";
import { Pagination } from "src/helpers/pagination";
import { FindAllDto } from "src/helpers/dto";

@Injectable()
export class ValueService {
  constructor(
    @InjectRepository(Value) private valueRepository: Repository<Value>,
    private attributeService: AttributeService,
  ) {}

  async create(createValueDto: CreateValueDto) {
    const newValue = new Value();
    newValue.value = createValueDto.value;

    const attribute = await this.attributeService.findOne(createValueDto.attribute_id);
    newValue.attribute = attribute.data;

    await this.valueRepository.save(newValue);

    return apiResponse(newValue);
  }

  async findAll({ limit, page }: FindAllDto) {
    const totalItems = await this.valueRepository.count();
    const pagination = new Pagination(totalItems, page, limit);

    const values = await this.valueRepository.find({
      skip: pagination.offset,
      take: pagination.limit,
      relations: ["attribute"],
    });

    return apiResponse(values, pagination);
  }

  async findOne(id: number) {
    const value = await this.valueRepository.findOne({
      where: { id },
    });

    if (!value) {
      throw new NotFoundException("value not found");
    }

    return apiResponse(value);
  }

  async update(id: number, updateValueDto: UpdateValueDto) {
    const { data: value } = await this.findOne(id);

    value.value = updateValueDto.value ?? updateValueDto.value;
    const updatedValue = await this.valueRepository.save(value);

    return apiResponse(updatedValue);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.valueRepository.delete(id);

    return apiResponse("value deleted");
  }
}
