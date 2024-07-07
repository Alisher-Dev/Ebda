import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/db.config";
import { ProductModule } from "./modules/product/product.module";
import { MediaModule } from "./modules/media/media.module";
import { AttributeModule } from "./modules/attribute/attribute.module";
import { CategoryModule } from "./modules/category/category.module";

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ProductModule, MediaModule, AttributeModule, CategoryModule],
})
export class AppModule {}
