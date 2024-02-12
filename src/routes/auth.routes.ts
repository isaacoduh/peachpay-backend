import express, { Router } from "express";
import { createAccount } from "../controllers/auth.controller";
const router: Router = express.Router();

export function authRoutes(): Router {
  router.post("/signup", createAccount);
  return router;
}
