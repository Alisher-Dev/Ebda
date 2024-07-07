import { RootEntity } from "src/helpers/root.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Category extends RootEntity {
  @Column()
  title: string;

  @Column({ default: 0 })
  views: number;

  @ManyToMany(() => Product, (product) => product.id)
  Product_id: number;
}
