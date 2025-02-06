import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerClasse = Router();

const prisma = new PrismaClient();

// Créer un élève
routerClasse.post("/", async (req, res) => {
    try {
        const { nom } = req.body;
        const eleve = await prisma.classe.create({
            data: { nom }
        });
        res.status(201).json(eleve);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la classe" });
    }
});

// Récupérer tous les élèves
routerClasse.get("/",checkToken, async (req, res) => {
    try {
        const classes = await prisma.classe.findMany({
            include: { eleves: true } // Inclut les relations
        });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des classes" });
    }
});


// Récupérer une classe par ID
routerClasse.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const classe = await prisma.classe.findUnique({
            where: { id: Number(id) },
            include: { eleves: true}
        });

        if (!classe) return res.status(404).json({ error: "Classe non trouvée" });

        res.status(200).json(classe);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la classe" });
    }
});

export default routerClasse;
