import {Sequelize} from "sequelize-typescript";
import dotenv from "dotenv";


const path = __dirname + "/../../.env";
dotenv.config({ path: path });
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    models: [__dirname + '/../models'],
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err: unknown) => {
      console.error("Unable to connect to the database:", err);
    });
  sequelize.sync();

  export default sequelize;