import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UnauthenticatedError from "../errors/UnauthenticatedError";
import NotAcceptableError from "../errors/NotAcceptableError";

// Declare an interface to extend the Request interface

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new UnauthenticatedError("Token not provided.");
    }

    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
      async (err: unknown, userInfo: JwtPayload | undefined | string) => {
        if (err) {
          throw new NotAcceptableError("Token is invalid");
        }

        if (!userInfo) {
          throw new NotAcceptableError("Invalid token payload");
        }

        // const tokenBlackListed = await accessBlacklisted(accessToken);
        // if (tokenBlackListed) {
        //   throw new NotAcceptableError("Token is not valid");
        // }

        res.locals.user = userInfo;
        return next();
      }
    );
  } catch (error) {
    next(error);
  }
};