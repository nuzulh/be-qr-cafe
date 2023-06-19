import { FindManyOptions } from "typeorm";
import { db } from "../../config/ormconfig";
import { UserEntity } from "../entities";
import { SignUpUserInput } from "../schemas";
import bcrypt from "bcryptjs";
import { userOptionsSelect } from "../consts";

export default class UserService {
  static repository = db.getRepository(UserEntity);

  static saveUser = async (
    input: SignUpUserInput,
  ): Promise<Partial<UserEntity>> =>
    await this.repository.manager.save(
      this.repository.manager.create(UserEntity, input),
    ).then((res) => ({
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
  ): Promise<UserEntity | null> =>
    await this.repository.findOne(
      { where: { id }, select: userOptionsSelect },
    );

  static findUserByUsername = async (
    username: string,
  ): Promise<UserEntity | null> =>
    await this.repository.findOne(
      { where: { username }, select: userOptionsSelect },
    );

  static comparePasswords = async (
    password: string,
    hashedPassword: string,
  ) => await bcrypt.compare(password, hashedPassword);
}
