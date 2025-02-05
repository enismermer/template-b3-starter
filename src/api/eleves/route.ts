import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const routerEleve = Router();
const prisma = new PrismaClient();

// Créer un élève
routerEleve.post("/", async (req, res) => {
    try {
        const { prenom, age, classeId } = req.body;
        const eleve = await prisma.eleve.create({
            data: { prenom, age, classeId }
        });
        res.status(201).json(eleve);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l'élève" });
    }
});

// Récupérer tous les élèves
routerEleve.get("/", async (req, res) => {
    try {
        const eleves = await prisma.eleve.findMany({
            include: { classe: true, groupes: true } // Inclut les relations
        });
        res.status(200).json(eleves);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des élèves" });
    }
});

// Récupérer un élève par ID
routerEleve.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const eleve = await prisma.eleve.findUnique({
            where: { id: Number(id) },
            include: { classe: true, groupes: true }
        });

        if (!eleve) return res.status(404).json({ error: "Élève non trouvé" });

        res.status(200).json(eleve);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de l'élève" });
    }
});

// Mettre à jour un élève
routerEleve.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { prenom, age, classeId } = req.body;

        const updatedEleve = await prisma.eleve.update({
            where: { id: Number(id) },
            data: { prenom, age, classeId }
        });

        res.status(200).json(updatedEleve);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'élève" });
    }
});

// Supprimer un élève
routerEleve.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.eleve.delete({
            where: { id: Number(id) }
        });

        res.status(204).send(); // Pas de contenu après suppression
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'élève" });
    }
});

export default routerEleve;
