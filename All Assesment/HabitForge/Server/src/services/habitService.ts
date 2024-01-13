import Habit from "../models/habit";
import BadRequestError from "../errors/BadRequestError";
import { IHabit } from "../interfaces/habitInterface";
import {
    IMessageResponse,
  } from "../interfaces/responseInterface";

export const createHabit = async (
  title: string,
  notes: string,
  difficulty: string,
  startdate: string,
  reminderinterval: number
): Promise<IMessageResponse> => {
  try {
    const newHabit = await Habit.create({
      title,
      notes,
      difficulty,
      startDate: startdate,
      reminderinterval,
    });
    await newHabit.save();

    return {
        message: "Habit Created!",
        status: 201,
    };
  } catch (error) {
    console.error("Error creating habit:", error);
    throw new BadRequestError("Error creating habit");
  }
};
