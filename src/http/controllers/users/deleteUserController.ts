import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { UserDoesNotExistsError } from "@/services/errors/userDoesNotExistsError"
import { DeleteUserService } from "@/services/userServices/deleteUserService"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = z.object({ id: z.string() }).parse(request.user)

        const prismaUsersRepository = new PrismaUsersRepository()
        const deleteUserService = new DeleteUserService(prismaUsersRepository)

        await deleteUserService.execute(user.id)

        reply.status(200).send()
    }
    catch(err) {
        if(err instanceof UserDoesNotExistsError){
            reply.status(404).send({
                messade: err.message
            })
        }
        
        throw err
    }
}