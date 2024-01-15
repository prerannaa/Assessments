import { NextFunction, Request, Response } from "express";
import { IHabit } from "../interfaces/habitInterface";
import { createHabit } from "../services/habitService";
import BadRequestError from "../errors/BadRequestError";
import { IMessageResponse } from "../interfaces/responseInterface";


/**
 * Handle the creation of a new habit.
 *
 * @param req - Express Request object containing the habit details in the request body.
 * @param res - Express Response object to send the created habit as a JSON response.
 * @param next - Express NextFunction to pass errors to the next middleware.
 * @returns {Promise<void>} - A Promise that resolves when the habit is created and the response is sent.
 */

export const handleNewHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {habitId, title, notes} = req.query;
    // const userId = res.locals.user.userId;

    const data: IMessageResponse = await createHabit(habitId as string, title as string, notes as string);
    res.status(data.status).json(data.message);
    res.status(data.status).json(data.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    // next(error)
  }
};
