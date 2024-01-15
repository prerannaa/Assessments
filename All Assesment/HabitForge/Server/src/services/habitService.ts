import Habit from "../models/habit";
import User from "../models/user";
import BadRequestError from "../errors/BadRequestError";
import {
    IMessageResponse,
  } from "../interfaces/responseInterface";

export const createHabit = async (
  // userId: string,
  habitId: string,
  title: string,
  notes: string,
): Promise<IMessageResponse> => {
  try {
    const newHabit = await Habit.create({
      // userId: userId,
      habitId: habitId,
      title: title,
      notes: notes
        });

    return {
        message: "Habit Created!",
        status: 201,
    };
  } catch (error) {
    console.error("Error creating habit:", error);
    throw new BadRequestError("Error creating habit");
  }
};
