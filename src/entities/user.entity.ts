import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
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

  @Column({ length: 32, nullable: true, unique: true })
  username!: string;

  @Column({ length: 50, nullable: true, unique: true })
  email!: string;

  @Column({ length: 20, nullable: true, unique: true })
  phoneNumber!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({
    type: "enum",
    enum: Object.values(UserRoles),
    default: UserRoles.TEMP,
  })
  role!: UserRole;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt!: Date;

  @BeforeInsert()
  async hashPasswordToInsert() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @BeforeUpdate()
  async hashPasswordToUpdate() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
