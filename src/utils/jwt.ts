import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signJwt = (payload: {
  username: string;
}) =>
  jwt.sign(
    payload,
    `${process.env.TOKEN_SECRET}`,
    { expiresIn: "10h" },
  );
