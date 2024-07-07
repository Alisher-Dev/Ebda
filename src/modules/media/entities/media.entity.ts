import { FileEnum } from "src/helpers/enum";
import { RootEntity } from "src/helpers/root.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Media extends RootEntity {
  @Column("text")
  url: string;

  @Column("enum", { enum: FileEnum })
  type: "video" | "image";
}
