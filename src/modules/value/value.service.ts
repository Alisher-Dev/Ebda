import { Injectable } from "@nestjs/common";
import { CreateValueDto } from "./dto/create-value.dto";
import { UpdateValueDto } from "./dto/update-value.dto";

@Injectable()
export class ValueService {
  create(createValueDto: CreateValueDto) {
    return "This action adds a new value";
  }

  findAll() {
    return `This action returns all value`;
  }

  findOne(id: number) {
    return `This action returns a #${id} value`;
  }

  update(id: number, updateValueDto: UpdateValueDto) {
    return `This action updates a #${id} value`;
  }

  remove(id: number) {
    return `This action removes a #${id} value`;
  }
}
