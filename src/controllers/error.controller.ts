import { NextFunction, Request, Response } from "express";
import { ResponseMessages } from "../consts";

export default class ErrorController {
  static otherRoutesHandler = (
    req: Request,
    res: Response,
  ) => {
    res.status(404).json({
      error: true,
      message: ResponseMessages.NOT_FOUND,
    });
  };

  static globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
  ) => {
    res.status(500).json({
      error: true,
      message: err.message || ResponseMessages.UNKNOWN,
    });
  };
}
