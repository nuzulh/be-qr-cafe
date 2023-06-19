import { FindOptionsSelect } from "typeorm";
import { OrderEntity, ProductEntity, TableEntity, UserEntity } from "../entities";

export const userOptionsSelect: FindOptionsSelect<UserEntity> = {
  id: true,
  name: true,
  username: true,
  email: true,
  phoneNumber: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export const tableOptionsSelect: FindOptionsSelect<TableEntity> = {
  id: true,
  user: userOptionsSelect,
  number: true,
  note: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export const productOptionsSelect: FindOptionsSelect<ProductEntity> = {
  id: true,
  name: true,
  description: true,
  category: true,
  size: true,
  price: true,
  stock: true,
  img: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export const orderOptionsSelect: FindOptionsSelect<OrderEntity> = {
  id: true,
  table: tableOptionsSelect,
  user: userOptionsSelect,
  products: productOptionsSelect,
  totalPrice: true,
  paymentMethod: true,
  status: true,
  confirmedAt: true,
  payedAt: true,
  readyAt: true,
  doneAt: true,
  canceledAt: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};
