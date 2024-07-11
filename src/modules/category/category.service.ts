import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { apiResponse } from "src/helpers/apiResponse";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();

    newCategory.title = createCategoryDto.title;
    newCategory.views = createCategoryDto.views;

    const category = await this.categoryRepository.save(newCategory);

    return apiResponse(category);
  }

  async findAll() {
    const category = await this.categoryRepository.find();
    return apiResponse(category);
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException("category not found");
    }

    this.categoryRepository.update(category.id, { views: category.views + 1 });
    return apiResponse(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    category.data.title = updateCategoryDto.title ?? updateCategoryDto.title;
    category.data.views = updateCategoryDto.views ?? updateCategoryDto.views;

    const updatedCategory = await this.categoryRepository.save(category.data);

    return apiResponse(updatedCategory);
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id);
    return apiResponse(`remove category id = ${id}`);
  }
}
