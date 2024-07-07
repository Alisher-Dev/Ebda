import { RootEntity } from "src/helpers/root.entity";
import { Value } from "src/modules/value/entities/value.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Attribute extends RootEntity {
  @Column("varchar", { length: 127 })
  name: string;

  @OneToMany(() => Value, (value) => value.value)
  values: Attribute[];
}
