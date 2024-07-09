import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAttributeDto } from "./dto/create-attribute.dto";
import { UpdateAttributeDto } from "./dto/update-attribute.dto";
import { Attribute } from "./entities/attribute.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pagination } from "src/helpers/pagination";
import { FindAllDto } from "src/helpers/dto";
import { apiResponse } from "src/helpers/apiResponse";

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const { name } = createAttributeDto;
    const newAttribute = new Attribute();

    newAttribute.name = name;

    const attribute = await this.attributeRepository.save(newAttribute);

    return apiResponse(attribute);
  }

  async findAll({ page, limit }: FindAllDto) {
    const totalItems = await this.attributeRepository.count();
    const pagination = new Pagination(totalItems, page, limit);

    const attributes = await this.attributeRepository.find({
      skip: pagination.offset,
      take: pagination.limit,
    });

    return apiResponse(attributes, pagination);
  }

  async findOne(id: number) {
    const attribute = await this.attributeRepository.findOne({
      where: { id },
    });

    if (!attribute) {
      throw new NotFoundException(`attribute with id ${id} not found`);
    }

    return apiResponse(attribute);
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    const attribute = (await this.findOne(id)).data;

    attribute.name = updateAttributeDto.name ?? updateAttributeDto.name;
    const updatedAttribute = await this.attributeRepository.save(attribute);

    return apiResponse(updatedAttribute);
  }

  async remove(id: number) {
    const attribute = (await this.findOne(id)).data;
    await this.attributeRepository.delete(attribute.id);

    return apiResponse(`attribute with id ${id} removed`);
  }
}
