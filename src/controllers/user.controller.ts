import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities";
import { UserService } from "../services";
import { GetRequestQuery, ResponseMessages, UserRoles } from "../consts";
import { getFindManyOptions, jsonResponse, paginateResponse } from "../utils";
import { userOptionsSelect } from "../consts";
import { UpdateResult } from "typeorm";

export default class UserController {
  static getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id, page, limit }: Partial<GetRequestQuery> = req.query;
      const result = jsonResponse<UserEntity>({
        error: false,
        message: ResponseMessages.GET_SUCCESS,
      });

      if (id) {
        result.data = await UserService.findUserById(
          id,
          userOptionsSelect,
        );
        result.error = result.data ? false : true;
        result.message = ResponseMessages[
          result.data ? "GET_SUCCESS" : "NOT_FOUND"
        ];
      } else {
        const [data, count] = await UserService.findUsers(
          getFindManyOptions<UserEntity>(
            req.query,
            userOptionsSelect,
          ),
        );
        result.data = data;
        result.pagination = paginateResponse(count, page, limit);
      }

      res.json(result);

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
      const { id }: Partial<GetRequestQuery> = req.query;
      const result = jsonResponse<UpdateResult>({
        error: true,
        message: ResponseMessages.PATCH_FAILED,
      });

      if (id) {
        result.data = await UserService.updateUser(
          id,
          req.body,
        );
        result.error = false;
        result.message = ResponseMessages.PATCH_SUCCESS;
      }

      res.json(result);

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
      const { id }: Partial<GetRequestQuery> = req.query;
      const result = jsonResponse<UpdateResult>({
        error: true,
        message: ResponseMessages.DELETE_FAILED,
      });

      if (id) {
        result.data = await UserService.deleteUser(id);
        result.error = false;
        result.message = ResponseMessages.DELETE_SUCCESS;
      }

      res.json(result);

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
