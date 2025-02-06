import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerReparation = Router();
const prisma = new PrismaClient();

// Créer une réparation
// Ajoute le checkToken afin de vérifier le token lors de la création d'e la réparation
routerReparation.post("/", async (req, res) => {
    try {
        const { nom, prix, instrumentId } = req.body;
        const reparation = await prisma.reparation.create({
            data: { nom, prix, instrumentId }
        });
        
        res.status(201).json(reparation);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la réparation" });
    }
});

// Supprimer un instrument
routerReparation.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.reparation.delete({
            where: { id: Number(id) }
        });

        res.status(204).send(); // Pas de contenu après suppression
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la réparation" });
    }
});

export default routerReparation;
