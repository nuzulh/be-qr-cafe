import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { TableCategories, TableStatuses } from "../consts";
import { UserEntity } from "./";

export type TableCategory = "regular" | "vip";
export type TableStatus = "free" | "inprocess";

@Entity({ name: "tbl_table" })
export class TableEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id!: UserEntity;

  @Column()
  number!: number;

  @Column({
    type: "enum",
    enum: Object.values(TableCategories),
    default: TableCategories.REGULAR,
  })
  category!: TableCategory;

  @Column({
    type: "enum",
    enum: Object.values(TableStatuses),
    default: TableStatuses.FREE,
  })
  status!: TableStatus;

  @Column({ length: 256 })
  note!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;
}
