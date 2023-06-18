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
import { TableEntity, UserEntity, ProductEntity } from "./"

export type OrderStatus = "new" | "confirmed" | "payed" | "ready" | "done" | "canceled";

@Entity({ name: "tbl_order" })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => TableEntity, (table) => table.id)
  table_id!: TableEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id!: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.id)
  products!: ProductEntity[];

  @Column()
  total_price!: number;

  @Column()
  payment_method!: string;

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
  confirmed_at!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  payed_at!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  ready_at!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  done_at!: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  canceled_at!: Date;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;
}
