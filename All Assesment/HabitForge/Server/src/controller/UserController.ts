import { Response, NextFunction } from 'express';
import { IUserLogin, IUserRegister } from '../interfaces/authInterface';
import { userRegister, userLogin } from '../services/AuthService';
import { error } from 'console';

/**
 * Handles the registration of a new user.
 * @param req - The Express request object containing the user registration details.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleUserRegistration = async(
  req: IUserRegister,
  res: Response,
  next: NextFunction
) => {
  try{
    const {username, password, email} = req.body;
    const data = await userRegister( username, password, email);
    res.status(data.status).json(data.message);
  } catch(error){
  }
};

/**
 * Handles the user login process, including authentication and token generation.
 * Sets cookies with access and refresh tokens in the response.
 * @param req - The Express request object containing the user login details.
 * @param res - The Express response object to send the result and set cookies.
 * @param next - The Express next function to handle errors.
 */

export const handleUserLogin = async(
  req: IUserLogin,
  res: Response,
  next: NextFunction
) => {
  try{
    const {username, password} =req.body;
    const data = await userLogin (username, password);
    res
      .status(data.status)
      .json(data.message)
      .cookie("accessToken", data.data.accessToken)
      .cookie("refreshToken", data.data.refreshToken)
      // .json(data.message);
}catch(error){
}};

// export const handleUserLogout = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { accessToken, refreshToken } = req.cookies;
//     const data = await logout(accessToken, refreshToken);
//     res.clearCookie("accessToken", {
//       secure: true,
//       sameSite: "none",
//     });
//     res.clearCookie("refreshToken", {
//       secure: true,
//       sameSite: "none",
//     });
//     res.status(data.status).json(data.message);
//   } catch (error) {
//     next(error);
//   }
// };

