import { RootEntity } from "src/helpers/root.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Product extends RootEntity {
  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  media: number;

  @JoinTable()
  @ManyToMany(() => Category, (category) => category.id, { onDelete: "CASCADE" })
  category: Category[];
}
