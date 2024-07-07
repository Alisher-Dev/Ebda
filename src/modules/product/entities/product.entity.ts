import { RootEntity } from "src/helpers/root.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Product extends RootEntity {
  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  media_id: number;

  @ManyToMany(() => Category, (category) => category.id)
  Category_id: number;
}
