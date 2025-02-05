import cors from "cors";
import "dotenv/config";
import express from "express";
import { Sequelize } from "sequelize";


import { userRouter } from "./router/users";
import { UserModel } from "./model/User";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const User = UserModel(sequelize);



// sequelize.sync({ force: true });
sequelize.sync();

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/", userRouter)

app.use("/api", apiRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
