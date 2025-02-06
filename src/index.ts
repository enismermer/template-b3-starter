import cors from "cors";
import "dotenv/config";
import express from "express";
import { routerAuth } from "./api/auth";
import { checkToken } from "./middlewares/checkToken";
import routerInstrument from "./api/instruments/route";
import routerReparation from "./api/reparations/route";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();



// Route pour la ressource instruments
apiRouter.use("/instruments", routerInstrument);

// Route pour la ressource reparations
// Avec un checkToken afin de vérifier le token de l'utilisateur connecté
apiRouter.use("/reparations", checkToken, routerReparation);

// Crée une route pour l'authentification
apiRouter.use("/auth", routerAuth);

// Créer une route pour gérer cette requête
apiRouter.get("/bananes?", async (req, res) => {
  let couleur = req.query.couleur;
  if (!couleur || couleur !== "jaune") {
    res.status(202).json({
      couleur: null,
      prix: 0.1
    })
  } else {
    res.status(202).json({
      couleur: couleur,
      prix: 2.5
    })
  }
});


// Route principale => /api
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
