import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT
    && parseInt(process.env.DB_PORT))
    || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: (process.env.DB_SYNC
    && Boolean(parseInt(process.env.DB_SYNC)))
    || false,
  logging: (process.env.DB_LOG
    && Boolean(parseInt(process.env.DB_LOG)))
    || false,
  entities: ["./src/entities/**/*.ts"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export const initializeDB = () => {
  db
    .initialize()
    .then(() => {
      console.log("Data source has been initialized");
    })
    .catch((err: any) => {
      console.error("Data source initialization error", err);
    });
};
