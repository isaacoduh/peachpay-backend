import { DataTypes, Model } from "sequelize";
import { compare, hash } from "bcryptjs";
import { sequelize } from "../database";

const SALT_ROUND = 10;

const UserModel = sequelize.define(
  "users",
  {
    firstname: { type: DataTypes.STRING, allowNull: true },
    lastname: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    passwordResetToken: { type: DataTypes.STRING, allowNull: true },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { indexes: [{ unique: true, fields: ["email"] }] }
);

UserModel.addHook("beforeCreate", async (user: Model) => {
  const hashedPassword: string = await hash(
    user.dataValues.password as string,
    SALT_ROUND
  );
  user.dataValues.password = hashedPassword;
});

UserModel.prototype.comparePassword = async function (
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
};

UserModel.prototype.hashPassword = async function (
  password: string
): Promise<string> {
  return hash(password, SALT_ROUND);
};

UserModel.sync({});
export { UserModel };
