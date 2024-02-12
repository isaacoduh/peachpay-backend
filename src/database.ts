import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize({
  database: "peachpay_local",
  username: "root",
  password: "root",
  host: "localhost",
  port: 8889,
  dialect: "mysql",
  logging: true,
  dialectOptions: { multipleStatements: true },
});

export async function databaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(`Application -  Unable to connect to database`);
    console.log(`error in application - ${error}`);
  }
}
