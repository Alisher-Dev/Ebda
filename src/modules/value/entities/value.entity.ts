import { RootEntity } from "src/helpers/root.entity";
import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Value extends RootEntity {
  @Column("varchar", { length: 127 })
  value: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.values)
  attribute: Attribute;
}
