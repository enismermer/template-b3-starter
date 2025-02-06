import { Router } from "express";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "../../middlewares/checkToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const routerUser = Router();

routerUser.get("/me", checkToken, async (req, res) => {
    const decoded = jwt.decode(req.token!) as DecodeToken
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
});