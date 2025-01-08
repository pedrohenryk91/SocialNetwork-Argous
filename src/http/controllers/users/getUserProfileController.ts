import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PrismaProfilesRepository } from "@/repositories/prisma/prismaProfilesRepository";
import { GetUserProfileService } from "@/services/userServices/getUserProfileService";
import { UserDoesNotExistsError } from "@/services/errors/userDoesNotExistsError";

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = z.object({ id: z.string() }).parse(request.user)

        const profilesRepository = new PrismaProfilesRepository()
        const getUserProfileService = new GetUserProfileService(profilesRepository)

        const { birthday, username, description } = await getUserProfileService.execute(user.id)

        reply.status(200).send({
            birthday,
            username,
            description,
        })
        
    }
    catch(err) {
        if(err instanceof UserDoesNotExistsError){
            reply.status(404).send({
                message: err.message
            })
        }

        throw err
    }
}