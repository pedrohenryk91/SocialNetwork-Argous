import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { EditUserInfoService } from "@/services/userServices/editUserInfoService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editUserInfo(request: FastifyRequest, reply: FastifyReply){
    try {
        const { id } = z.object({ id: z.string() }).parse(request.user)

        const newUserData = z.object({
            username: z.string().min(4).optional(),
            birthday: z.string().transform((str)=>new Date(str)).pipe(z.date()).optional(),
            description: z.string().optional(),
        })

        const {username, birthday, description} = newUserData.parse(request.body)

        const prismaUsersRepository = new PrismaUsersRepository()
        const editUserInfoService = new EditUserInfoService(prismaUsersRepository)

        const message = await editUserInfoService.execute({
            id,
            username,
            birthday,
            description,
        })

        reply.status(201).send({
            message,
        })
    }
    catch(err){
        reply.send({
            err
        })
    }

}