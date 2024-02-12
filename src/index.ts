import express, { Express } from "express";
import dotenv from "dotenv";
import { start } from "./server";
import { databaseConnection } from "./database";
import { config } from "./config";

dotenv.config();
const initialize = (): void => {
  config.cloudinaryConfig();
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
