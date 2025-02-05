import cors from "cors";
import "dotenv/config";
import express from "express";
import routerEleve from "./api/eleves/route";
import routerClasse from "./api/classes/route";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

// Route principale => /api
app.use("/api", apiRouter);

// Route secondaire => /api/eleves
apiRouter.use("/eleves", routerEleve);

// Route secondaire => /api/eleves
apiRouter.use("/classes", routerClasse);

// Route principale, on envoie un message => /api
apiRouter.get("/", async (req, res) => {
  res.json("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
