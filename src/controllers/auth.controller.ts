// import { IAuthPayload } from "./../interfaces/auth.interface";
// import { omit } from "lodash";
// import { UserModel } from "../models/user.model";
import { Request, Response } from "express";
// import crypto from "crypto";

import { createAccountForUser } from "../services/auth.service";

const createAccount = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const payload = { email: email, password: password };
  const result = await createAccountForUser(payload);
  res.status(201).json({ message: "User created successfully!", data: result });
};

export { createAccount };
