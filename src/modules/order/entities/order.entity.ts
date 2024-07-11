import { DeliveryEnum, DeliveryTypeEnum } from "src/helpers/enum";
import { RootEntity } from "src/helpers/root.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Order extends RootEntity {
  @Column()
  username: string;

  @Column()
  phone_number: string;

  @Column({ type: "enum", enum: DeliveryEnum })
  deliver_type: DeliveryEnum;

  @Column()
  street: string;

  @Column()
  house: number;

  @Column()
  flat: number;

  @Column({ default: null })
  comment: string;

  @Column({ type: "enum", enum: DeliveryTypeEnum })
  time_type: DeliveryTypeEnum;

  @JoinTable()
  @ManyToMany(() => Product, (product) => product.id, { onDelete: "CASCADE" })
  product: Product[];
}
