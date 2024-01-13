import { Request, Response, NextFunction } from 'express';

export const validateHabitData = (req: Request, res: Response, next: NextFunction) => {
  const { title, notes, difficulty, startDate, repeatSchedule, reminderInterval, reminderTime } = req.body;

//   if (!title || !startDate || !repeatSchedule || !userId)
if( !title || !repeatSchedule) {
    return res.status(400).json({ error: 'Title, startDate, repeatSchedule, and userId are required fields' });
  }
  next();
};
