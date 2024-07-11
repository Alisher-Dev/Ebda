import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/db.config";
import { ProductModule } from "./modules/product/product.module";
import { MediaModule } from "./modules/media/media.module";
import { AttributeModule } from "./modules/attribute/attribute.module";
import { CategoryModule } from "./modules/category/category.module";
import { OrderModule } from "./modules/order/order.module";
import { FileUploadModule } from "./modules/uploadFile/uploadFile.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ProductModule,
    MediaModule,
    AttributeModule,
    CategoryModule,
    OrderModule,
    OrderModule,
    FileUploadModule,
  ],
})
export class AppModule {}
