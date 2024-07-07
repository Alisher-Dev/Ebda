import { config } from "dotenv";

config();

export const envConfig = {
  port: process.env.PORT,
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
  },
};
