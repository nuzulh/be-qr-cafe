import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ProductCategories, ProductSizes } from "../consts";

export type ProductCategory = "food" | "drink" | "snack";
export type ProductSize = "S" | "R" | "L";

@Entity({ name: "tbl_product" })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({
    type: "enum",
    enum: Object.values(ProductCategories),
    default: ProductCategories.DRINK,
  })
  category!: ProductCategory;

  @Column({
    type: "enum",
    enum: Object.values(ProductSizes),
    default: ProductSizes.R,
  })
  size!: ProductSize;

  @Column({ length: 256, nullable: true })
  description!: string;

  @Column()
  price!: number;

  @Column()
  stock!: number;

  @Column()
  img!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt!: Date;
}
