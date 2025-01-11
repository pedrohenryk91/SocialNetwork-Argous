import { PrismaProfilesRepository } from "@/repositories/prisma/prismaProfilesRepository";
import { SearchForUserService } from "@/services/searchServices/searchForUserService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchUsers(request: FastifyRequest, reply: FastifyReply){

    const requestQuerySchema = z.object({
        username: z.string().toLowerCase(),
    })

    const query = requestQuerySchema.safeParse(request.query)

    if(!query.success){
        return reply.status(417).send({
            error: query.error,
        })
    }

    const username = query.data.username

    const profilesRepository = new PrismaProfilesRepository()
    const searchForUserService = new SearchForUserService(profilesRepository)

    const profiles = await searchForUserService.execute(username, 20)

    if(!profiles){
        return reply.status(404).send({
            message:"Couldn't find any user with this name!):"
        })
    }

    return reply.status(200).send({
        users: [...profiles]
    })
}