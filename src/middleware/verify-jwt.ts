import { NextFunction, Request, Response } from "express";
import { ResponseMessages } from "../consts";
import jwt from "jsonwebtoken";

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken || !authHeader.startsWith("Bearer"))
    return res.json({
      error: true,
      message: ResponseMessages.UNAUTHORIZED,
    });

  jwt.verify(
    accessToken,
    `${process.env.TOKEN_SECRET}`,
    (err: any, payload: any) => {
      if (err) return res.json({
        error: true,
        message: ResponseMessages.UNAUTHORIZED,
      });
      res.locals.username = payload.username;
      next();
    },
  );
};
