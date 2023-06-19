import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities";
import { UserService } from "../services";
import { GetRequestQuery, JsonResponse, ResponseMessages, UserRoles } from "../consts";
import { getFindManyOptions, jsonResponse, paginateResponse } from "../utils";
import { userOptionsSelect } from "../consts";

export default class UserController {
  static getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id, page, limit }: Partial<GetRequestQuery> = req.query;

      if (id) res.json(jsonResponse<UserEntity>({
        error: false,
        message: ResponseMessages.GET_SUCCESS,
        data: await UserService.findUserById(id),
      }));
      else {
        const [data, count] = await UserService.findUsers(
          getFindManyOptions<UserEntity>(
            req.query,
            userOptionsSelect,
          ),
        );
        res.json(jsonResponse<UserEntity>({
          error: false,
          message: ResponseMessages.GET_SUCCESS,
          data,
          pagination: paginateResponse(count, page, limit),
        }));
      }

    } catch (err: any) {
      next(err);
    }
  };

  static updateUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {


    } catch (err: any) {
      next(err);
    }
  };

  static deleteUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {


    } catch (err: any) {
      next(err);
    }
  };

  static getUserRolesHandler = async (
    req: Request,
    res: Response,
  ) => {
    res.json(jsonResponse<UserRoles>({
      error: false,
      message: ResponseMessages.GET_SUCCESS,
      data: Object.values(UserRoles),
    }));
  };
}
