import cors from "cors";
import "dotenv/config";
import express from "express";
import routerEleve from "./api/eleves/route";
import routerClasse from "./api/classes/route";
import { routerAuth } from "./api/auth";
import { checkToken } from "./middlewares/checkToken";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();


// Route secondaire => /api/eleves
apiRouter.use("/eleves", routerEleve);

// Route secondaire => /api/classes
apiRouter.use("/classes", routerClasse);

// Route secondaire => /api/local/register
apiRouter.use("/auth", routerAuth);

// Pour envoyer un message à la route principale => /api
apiRouter.get("/", async (req, res) => {
  res.json("Hello world!");
});


// Route principale => /api
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
