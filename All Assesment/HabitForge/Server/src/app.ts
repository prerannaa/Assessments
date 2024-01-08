import express, { Request, Response } from 'express';
import "./database/connection";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute';

const path = __dirname + "/../../.env";
dotenv.config({ path: path });
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.use(express.json());

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
