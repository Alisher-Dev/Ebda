import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();

    // newCategory.title;

    return "create category";
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // const media = await this.findOne(id);
    // media.type = updateMediaDto.type ?? updateMediaDto.type;
    // media.url = updateMediaDto.url ?? updateMediaDto.url;
    // const updatedMedia = await this.mediaRepository.save(media);
    // return updatedMedia;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
