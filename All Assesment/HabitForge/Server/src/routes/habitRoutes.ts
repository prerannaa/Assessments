import express from 'express';
import { handleNewHabit } from '../controller/HabitController';
import { validateHabitData } from '../middlewares/habit';

const router = express.Router();

router.post('/habits', validateHabitData, handleNewHabit);

export {  router as HabitRoutes };
