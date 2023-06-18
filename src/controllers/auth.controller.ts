import { NextFunction, Request, Response } from "express";
import { ResponseMessages } from "../consts";
import { UserService } from "../services";
import { SignInUserInput, SignUpUserInput } from "../schemas";
import { signJwt } from "../utils";

export default class AuthController {
  static signUpUserHandler = async (
    req: Request<{}, {}, SignUpUserInput>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await UserService.saveUser(req.body);

      res.json({
        error: false,
        message: ResponseMessages.SIGNUP_SUCCESS,
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
        },
      });

    } catch (err: any) {
      if (err.code === "23505") return res.json({
        error: true,
        message: ResponseMessages.USER_EXISTS,
      });
      next(err);
    }
  };

  static signInUserHandler = async (
    req: Request<{}, {}, SignInUserInput>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username, password } = req.body;
      const user = await UserService.findUserByUsername(username);

      if (
        !user ||
        !(await UserService.comparePasswords(password, user.password))
      ) return res.json({
        error: true,
        message: ResponseMessages.INVALID_CREDENTIALS,
      });

      const accessToken = signJwt({ username });

      res.json({
        error: false,
        message: ResponseMessages.SIGNIN_SUCCESS,
        data: {
          username,
          role: user.role,
          access_token: accessToken,
        },
      });

    } catch (err: any) {
      next(err);
    }
  };

  static signOutHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const username = res.locals.username;

      res.json({
        error: false,
        message: `${ResponseMessages.SIGNOUT_SUCCESS} (${username})`,
      });

    } catch (err: any) {
      next(err);
    }
  };
}
