import { FileEnum } from "src/helpers/enum";
import { RootEntity } from "src/helpers/root.entity";
import { FileType } from "src/helpers/types";
import { Column, Entity } from "typeorm";

@Entity()
export class Media extends RootEntity {
  @Column("text")
  url: string;

  @Column({ type: "enum", enum: FileEnum })
  type: FileType;
}
