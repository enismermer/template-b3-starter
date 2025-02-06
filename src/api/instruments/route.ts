import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "../../middlewares/checkToken";

const routerInstrument = Router();
const prisma = new PrismaClient();

// Créer un instrument
// Ajoute le checkToken afin de vérifier le token lors de la création d'instrument
routerInstrument.post("/", checkToken, async (req, res) => {
    try {
        const { nom, poids, couleur, prix } = req.body;
        const instrument = await prisma.instrument.create({
            data: { nom, poids, couleur, prix }
        });

        // const result = await prisma.instrument.findMany({include: reparations: true})
        
        res.status(201).json(instrument);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l'instrument" });
    }
});

// Récupérer tous les instruments
routerInstrument.get("/", async (req, res) => {
    try {
        const instruments = await prisma.instrument.findMany({});
        
        res.status(200).json(instruments);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des instruments" });
    }
});

// Récupérer un instrument par ID
routerInstrument.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const instrument = await prisma.instrument.findUnique({
            where: { id: Number(id) },
        });

        if (!instrument) return res.status(404).json({ error: "Instrument non trouvé" });

        res.status(200).json(instrument);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de l'instrument" });
    }
});

// Mettre à jour un instrument
routerInstrument.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, poids, couleur, prix } = req.body;

        const updatedInstrument = await prisma.instrument.update({
            where: { id: Number(id) },
            data: { nom, poids, couleur, prix }
        });

        res.status(200).json(updatedInstrument);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'instrument" });
    }
});

// Supprimer un instrument
routerInstrument.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.instrument.delete({
            where: { id: Number(id) }
        });

        res.status(204).send(); // Pas de contenu après suppression
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'instrument" });
    }
});

export default routerInstrument;
