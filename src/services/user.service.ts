import { FindManyOptions } from "typeorm";
import { db } from "../../config/ormconfig";
import { UserEntity } from "../entities";
import { SignUpUserInput } from "../schemas";
import bcrypt from "bcryptjs";

export default class UserService {
  static repository = db.getRepository(UserEntity);

  static saveUser = async (
    input: SignUpUserInput,
  ): Promise<UserEntity> =>
    await this.repository.manager.save(
      this.repository.manager.create(UserEntity, input),
    );

  static findUsers = async (
    options?: FindManyOptions<UserEntity>,
  ): Promise<[UserEntity[], number]> =>
    await this.repository.findAndCount(options);

  static findUserById = async (
    id: string,
  ): Promise<UserEntity | null> =>
    await this.repository.findOneBy({ id });

  static findUserByUsername = async (
    username: string,
  ): Promise<UserEntity | null> =>
    await this.repository.findOneBy({ username });

  static comparePasswords = async (
    password: string,
    hashedPassword: string,
  ) => await bcrypt.compare(password, hashedPassword);
}
