import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAttributeDto } from "./dto/create-attribute.dto";
import { UpdateAttributeDto } from "./dto/update-attribute.dto";
import { Attribute } from "./entities/attribute.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

    return attribute;
  }

  async findAll() {
    return await this.attributeRepository.find();
  }

  async findOne(id: number) {
    const attribute = await this.attributeRepository.findOne({
      where: { id },
    });

    if (!attribute) {
      throw new NotFoundException(`attribute with id ${id} not found`);
    }

    return attribute;
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    const attribute = await this.findOne(id);

    attribute.name = updateAttributeDto.name ?? updateAttributeDto.name;
    const updatedAttribute = await this.attributeRepository.save(attribute);

    return updatedAttribute;
  }

  async remove(id: number) {
    const attribute = await this.findOne(id);
    await this.attributeRepository.delete(attribute.id);

    return `attribute with id ${id} removed`;
  }
}
