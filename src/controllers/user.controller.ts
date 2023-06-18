import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities";
import { UserService } from "../services";
import { GetRequestQuery, JsonResponse, ResponseMessages, UserRoles } from "../consts";
import { getFindManyOptions, isValidUuid, jsonResponse, paginateResponse } from "../utils";

export default class UserController {
  static getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id, page, limit }: Partial<GetRequestQuery> = req.query;
      let data: UserEntity | UserEntity[] | null = null;
      let count: number | null = null;
      let result: JsonResponse<UserEntity> = {
        error: false,
        message: ResponseMessages.GET_SUCCESS,
      };

      if (id) {
        isValidUuid(id)
          ? data = await UserService.findUserById(id)
          : result.message = ResponseMessages.NOT_FOUND;
        result = jsonResponse({ ...result, data });
      } else {
        [data, count] = await UserService.findUsers(
          getFindManyOptions<UserEntity>(
            req.query,
            UserService.repository.metadata,
          ),
        );
        const pagination = paginateResponse(count, page, limit);
        result = jsonResponse({ ...result, data, pagination });
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
    res.json({
      error: false,
      message: ResponseMessages.GET_SUCCESS,
      data: Object.values(UserRoles),
    });
  };
}
