import User from "../models/user";
import bcrypt from "bcrypt";
import NotFoundError from "../errors/NotFoundError";
import BadRequestError from "../errors/BadRequestError";
import jwt from "jsonwebtoken";
import {
  ILoginMessageResponse,
  IMessageResponse,
} from "../interfaces/responseInterface";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants/jwt";

/**
 * Registers a user with the provided username, and password.
 * @param username - The desired username for the user.
 * @param password - The password for the user.
 * @returns A Promise resolving to an IMessageResponse indicating the status and message.
 */
export const userRegister = async (
  username: string,
  password: string,
  email: string
): Promise<IMessageResponse> => {
  const saltRound = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRound);

  // Check if the username already exists
  const existingUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Create a new user
  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
  });
  await newUser.save();

  return {
    message: "User Registered!!",
    status: 200,
  };
};

/**
 * User login and authentication process using jwt
 * @param username
 * @param password
 * @returns
 */

export const userLogin = async (
  username: string,
  password: string,
): Promise<ILoginMessageResponse> => {
  const user = await User.findOne({ where: { username:username } });

  if (!user) throw new NotFoundError("Invalid Username!");
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) throw new BadRequestError("Invalid Password!");

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );

  return {
    message: "User login successful.",
    status: 200,
    data: {
      accessToken,
      refreshToken,
    },
  };
};
