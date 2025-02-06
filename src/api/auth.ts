import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { DecodeToken, checkToken } from "../middlewares/checkToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const routerAuth = Router();

routerAuth.post("/local/register", async (req, res) => {
    // const login = req.body.login;
    // const password = req.body.password;
    console.log("Request body:", req.body); // Debugging

    const { login, password } = req.body.data;

    // Vérifier si les données sont valides
    if (!login || !password) {
        return res.status(400).json({ message: "Login and password are required" });
    }

    const userWithEmail = await prisma.user.findUnique({ where: { login } });

    if (userWithEmail) {
        res.status(400).json("Email already exists");
    }
    else {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
        const newUser = await prisma.user.create({ 
            data: {
                login, 
                password: hashedPassword 
            }
        });
        res.status(201).json(newUser);
    }
});


routerAuth.post("/local", async (req, res) => {
    const { identifier, password } = req.body.data;

    const userWithEmail = await prisma.user.findFirst({ where: { login: identifier } });
    
    if (!userWithEmail) {
        res.status(400).json("Email or Password is incorrect");
    }
    else {
        const isPasswordCorrect = await bcrypt.compare(password, userWithEmail.password);
        if (isPasswordCorrect) {
            const token = jwt.sign(userWithEmail, process.env.JWT_SECRET!);
            res.json({
                token,
                ...userWithEmail
            });
        }
        else {
            res.status(400).json("Email or Password is incorrect");
        }
    }
})