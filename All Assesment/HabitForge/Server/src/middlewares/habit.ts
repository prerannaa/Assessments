import { Request, Response} from 'express';

export const validateHabitData = (req: Request, res: Response) => {
  const { title, notes, difficulty, startDate, repeatSchedule, reminderInterval, reminderTime } = req.body;

  if (!title || !startDate || !repeatSchedule)
// if( !title) 
{
    return res.status(400).json({ error: 'Title is required fields' });
  }
};
