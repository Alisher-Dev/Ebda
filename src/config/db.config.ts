import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envConfig } from "./env.config";
import { Product } from "src/modules/product/entities/product.entity";

export const dbConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: envConfig.database.host,
  port: envConfig.database.port,
  username: envConfig.database.user,
  password: envConfig.database.password,
  database: envConfig.database.name,
  entities: [Product],
  synchronize: true,
};