import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { OrderStatuses } from "../consts";
import { TableEntity, UserEntity, ProductEntity } from "./";

export type OrderStatus = "new" | "confirmed" | "payed" | "ready" | "done" | "canceled";

@Entity({ name: "tbl_order" })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => TableEntity, (table) => table.id)
  table!: TableEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user!: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.id)
  products!: ProductEntity[];

  @Column()
  totalPrice!: number;

  @Column()
  paymentMethod!: string;

  @Column({
    type: "enum",
    enum: Object.values(OrderStatuses),
    default: OrderStatuses.NEW,
  })
  status!: OrderStatus;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  confirmedAt!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  payedAt!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  readyAt!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  doneAt!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  canceledAt!: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt!: Date;
}
