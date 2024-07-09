import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new Product();

    newProduct.desc = createProductDto.desc;
    newProduct.title = createProductDto.title;
    newProduct.price = createProductDto.price;
    newProduct.media = createProductDto.media_id;
    const category = await this.categoryRepository.findOne({ where: { id: createProductDto.category_id } });
    if (!category) {
      throw new NotFoundException("category not found");
    }
    newProduct.category = [category];

    const products = await this.productRepository.save(newProduct);

    return products;
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException("product not found");
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    product.desc = updateProductDto.desc ?? updateProductDto.desc;
    product.price = updateProductDto.price ?? updateProductDto.price;
    product.media = updateProductDto.media_id ?? updateProductDto.media_id;
    product.title = updateProductDto.title ?? updateProductDto.title;
    const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.category_id } });

    if (!category) {
      throw new NotFoundException("category not found");
    }
    product.category = [category];

    const updatedMedia = await this.productRepository.save(product);

    return updatedMedia;
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
    return `product id = ${id}`;
  }
}
