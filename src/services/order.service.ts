import { FindManyOptions } from "typeorm";
import { db } from "../../config/ormconfig";
import { OrderEntity } from "../entities";

export default class OrderService {
  static repository = db.getRepository(OrderEntity);

  static saveOrder = async (
    data: Partial<OrderEntity>,
  ): Promise<OrderEntity> =>
    await this.repository.save(this.repository.create(data));

  static findOrders = async (
    options?: FindManyOptions<OrderEntity>,
  ): Promise<OrderEntity[]> =>
    await this.repository.find(options);

  static findOrderById = async (
    id: string,
  ): Promise<OrderEntity | null> =>
    await this.repository.findOneBy({ id });
}
