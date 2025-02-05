import { Router } from "express";
import { PrismaClient } from "@prisma/client";

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
        res.status(500).json({ error: "Erreur lors de la création de l'élève" });
    }
});

// Récupérer tous les élèves
routerClasse.get("/", async (req, res) => {
    try {
        const eleves = await prisma.classe.findMany({
            include: { eleves: true } // Inclut les relations
        });
        res.status(200).json(eleves);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des élèves" });
    }
});



export default routerClasse;
