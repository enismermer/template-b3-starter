import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (login: string, password: string) => {
    return await prisma.user.create({
        data: { login, password },
    });
};

export const getUserByLogin = async (login: string) => {
    return await prisma.user.findUnique({
        where: { login },
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const updateUser = async (id: number, data: Partial<{ login: string; password: string }>) => {
    return await prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id },
    });
};
