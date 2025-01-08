import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { IncorrectPasswordError } from "@/services/errors/incorrectPasswordError";
import { EditUserAuthService } from "@/services/userServices/editUserAuthService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editUserAuth(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = z.object({ id: z.string() }).parse(request.user)

        const UserAuthSchema = z.object({
            email: z.string().email("Invalid Email").toLowerCase().optional(),
            new_password: z.string().min(6).optional(),
            old_password: z.string()
        })

        const { email, new_password, old_password } = UserAuthSchema.parse(request.body)

        const editUserAuthService = new EditUserAuthService(new PrismaUsersRepository())

        const message = await editUserAuthService.execute({
            id,
            old_password,
            new_password,
            email,
        })

        const statusCode = (message === "User did not make any changes" ? 200 : 201)

        reply.status(statusCode).send({
            message,
        })
    }
    catch(err) {
        if(err instanceof IncorrectPasswordError){
            reply.status(401).send({
                message: err.message
            })
        }
        
        throw err
    }
}