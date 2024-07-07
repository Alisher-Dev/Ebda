import { RootEntity } from "src/helpers/root.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends RootEntity {
  @Column()
  title: string;
}
