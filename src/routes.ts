import { Application } from "express";
import { authRoutes } from "./routes/auth.routes";
const BASE_PATH = "/api/v1/";
export function appRoutes(app: Application): void {
  app.use(BASE_PATH, authRoutes());
}
