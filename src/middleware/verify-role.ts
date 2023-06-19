import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";
import { jsonResponse } from "../utils";
import { ResponseMessages } from "../consts";

export const verifyRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const username = res.locals.username;
    const user = await UserService.findUserByUsername(username);

    if (user?.role === "admin") next();
    else res.json(jsonResponse({
      error: true,
      message: ResponseMessages.INVALID_ROLE,
    }));

  } catch (err: any) {
    next(err);
  }
};
