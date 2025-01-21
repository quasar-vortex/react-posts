import dotenv from "dotenv";
dotenv.config();
export const dbConfig = {
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
