import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import bcrypt from "bcryptjs";
import { UserRoles } from "../consts";

export type UserRole = "admin" | "cashier" | "consumer" | "temp";

@Entity({ name: "tbl_user" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, nullable: true, unique: true })
  username!: string;

  @Column({ length: 50, nullable: true, unique: true })
  email!: string;

  @Column({ length: 20, nullable: true, unique: true })
  phone_number!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({
    type: "enum",
    enum: Object.values(UserRoles),
    default: UserRoles.TEMP,
  })
  role!: UserRole;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
