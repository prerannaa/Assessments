import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from './routes/indexRoute';
import "./database/connection";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
import cors from 'cors';


dotenv.config();

const serverPort = process.env.SERVER_PORT || 8000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use("/api", router);
app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(serverPort, async () => {
  console.log(`Server started on http://localhost:${serverPort}`);
});