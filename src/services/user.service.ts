import { FindManyOptions, FindOptionsSelect, UpdateResult } from "typeorm";
import { db } from "../../config/ormconfig";
import { UserEntity } from "../entities";
import bcrypt from "bcryptjs";
import {
  DeleteUserIdInput,
  SignUpUserInput,
  UpdateUserIdInput,
  UpdateUserInput,
} from "../schemas";

export default class UserService {
  static repository = db.getRepository(UserEntity);

  static saveUser = async (
    input: SignUpUserInput,
  ): Promise<Partial<UserEntity>> =>
    await this.repository.manager.save(
      this.repository.manager.create(UserEntity, input),
    ).then((res: UserEntity) => ({
      id: res.id,
      name: res.name,
      username: res.username,
      email: res.email,
      phoneNumber: res.phoneNumber,
      role: res.role,
    }));

  static findUsers = async (
    options?: FindManyOptions<UserEntity>,
  ): Promise<[UserEntity[], number]> =>
    await this.repository.findAndCount(options);

  static findUserById = async (
    id: string,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity | null> =>
    await this.repository.findOne(
      { where: { id }, select },
    );

  static findUserByUsername = async (
    username: string,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity | null> =>
    await this.repository.findOne(
      { where: { username }, select },
    );

  static updateUser = async (
    id: UpdateUserIdInput,
    input: UpdateUserInput,
  ): Promise<UpdateResult> => {
    if (input.password)
      input.password = await bcrypt.hash(input.password, 12);
    return await this.repository.update(id, input);
  };

  static deleteUser = async (
    id: DeleteUserIdInput,
  ): Promise<UpdateResult> =>
    await this.repository.softDelete(id);


  static comparePasswords = async (
    password: string,
    hashedPassword: string,
  ) => await bcrypt.compare(password, hashedPassword);
}
