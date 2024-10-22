import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envConfig } from "./env.config";
import { Product } from "src/modules/product/entities/product.entity";
import { Media } from "src/modules/media/entities/media.entity";
import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { Value } from "src/modules/value/entities/value.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Order } from "src/modules/order/entities/order.entity";

export const dbConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: envConfig.database.host,
  port: envConfig.database.port,
  username: envConfig.database.user,
  password: envConfig.database.password,
  database: envConfig.database.name,
  entities: [Product, Media, Attribute, Value, Category, Order],
  synchronize: true,
};
