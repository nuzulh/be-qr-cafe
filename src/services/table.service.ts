import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { db } from "../../config/ormconfig";
import { TableEntity, UserEntity } from "../entities";

export default class TableService {
  static repository = db.getRepository(TableEntity);

  static saveTable = async (
    data: Partial<TableEntity>,
  ): Promise<TableEntity> =>
    await this.repository.save(this.repository.create(data));

  static findTables = async (
    options?: FindManyOptions<TableEntity>,
  ): Promise<TableEntity[]> =>
    await this.repository.find(options);

  static findTableById = async (
    id: string,
  ): Promise<TableEntity | null> =>
    await this.repository.findOneBy({ id });

  static findTableByNumber = async (
    user: FindOptionsWhere<UserEntity>,
    number: number,
  ): Promise<TableEntity | null> =>
    await this.repository.findOneBy({
      user: { id: user.id },
      number,
    });
}
