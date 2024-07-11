import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { apiResponse } from "src/helpers/apiResponse";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = new Order();

    newOrder.comment = createOrderDto.comment;
    newOrder.deliver_type = createOrderDto.deliver_type;
    newOrder.flat = createOrderDto.flat;
    newOrder.house = createOrderDto.house;
    newOrder.phone_number = createOrderDto.phone_number;
    newOrder.street = createOrderDto.street;
    newOrder.time_type = createOrderDto.time_type;
    newOrder.username = createOrderDto.username;

    const product = await this.productRepository.findOne({ where: { id: createOrderDto.product_id } });
    if (!product) {
      throw new NotFoundException("category not found");
    }
    newOrder.product = [product];

    const order = await this.orderRepository.save(newOrder);

    return apiResponse(order);
  }

  async findAll() {
    const order = await this.orderRepository.find();
    return apiResponse(order);
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException("order not found");
    }
    return apiResponse(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const product = await this.findOne(id);

    product.data.comment = updateOrderDto.comment ?? updateOrderDto.comment;
    product.data.deliver_type = updateOrderDto.deliver_type ?? updateOrderDto.deliver_type;
    product.data.flat = updateOrderDto.flat ?? updateOrderDto.flat;
    product.data.house = updateOrderDto.house ?? updateOrderDto.house;
    product.data.phone_number = updateOrderDto.phone_number ?? updateOrderDto.phone_number;
    product.data.street = updateOrderDto.street ?? updateOrderDto.street;
    product.data.time_type = updateOrderDto.time_type ?? updateOrderDto.time_type;
    product.data.username = updateOrderDto.username ?? updateOrderDto.username;

    const updatedOrder = await this.orderRepository.save(product.data);

    return apiResponse(updatedOrder);
  }

  async remove(id: number) {
    await this.orderRepository.delete(id);
    return apiResponse(`remove order id = ${id}`);
  }
}
