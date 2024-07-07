import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new Product();

    newProduct.desc = createProductDto.desc;
    newProduct.title = createProductDto.title;
    newProduct.price = createProductDto.price;
    newProduct.media_id = createProductDto.media_id;

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

    product.desc = product.desc ?? updateProductDto.desc;
    product.price = product.price ?? updateProductDto.price;
    product.media_id = product.media_id ?? updateProductDto.media_id;
    product.title = product.title ?? updateProductDto.title;

    const updatedMedia = await this.productRepository.save(product);

    return updatedMedia;
  }

  async remove(id: number) {
    const product = await this.productRepository.delete(id);
    return product;
  }
}
