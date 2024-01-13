import { NextFunction, Request, Response } from "express";
import { IHabit } from "../interfaces/habitInterface";
import { createHabit } from "../services/habitService";


/**
 * Handle the creation of a new habit.
 *
 * @param req - Express Request object containing the habit details in the request body.
 * @param res - Express Response object to send the created habit as a JSON response.
 * @param next - Express NextFunction to pass errors to the next middleware.
 * @returns {Promise<void>} - A Promise that resolves when the habit is created and the response is sent.
 */

export const handleNewHabit = async (
  req: IHabit,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, notes, difficulty, startdate, reminderinterval} = req.body;
    const habit = await createHabit( title, notes, difficulty, startdate, reminderinterval);
    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error)
  }
};
