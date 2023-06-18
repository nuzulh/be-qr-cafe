import { NextFunction, Request, Response } from "express";

export const verifyRole = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const username = res.locals.username;
    console.log(username);
    next();

  } catch (err: any) {
    next(err);
  }
};
