import { FindManyOptions } from "typeorm";
import { db } from "../../config/ormconfig";
import { ProductEntity } from "../entities";

export default class ProductService {
  static repository = db.getRepository(ProductEntity);

  static saveProduct = async (
    data: Partial<ProductEntity>,
  ): Promise<ProductEntity> =>
    await this.repository.save(this.repository.create(data));

  static findProducts = async (
    options?: FindManyOptions<ProductEntity>,
  ): Promise<ProductEntity[]> =>
    await this.repository.find(options);

  static findProductById = async (
    id: string,
  ): Promise<ProductEntity | null> =>
    await this.repository.findOneBy({ id });
}
