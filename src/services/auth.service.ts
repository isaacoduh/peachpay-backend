import { UserModel } from "../models/user.model";
import { Model } from "sequelize";
import { omit } from "lodash";
// import { sign } from "jsonwebtoken";
const createAccountForUser = async (data: any) => {
  try {
    const result: Model = await UserModel.create(data);
    const userData = omit(result.dataValues, [
      "password",
      "passwordResetExpires",
    ]);
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export { createAccountForUser };
