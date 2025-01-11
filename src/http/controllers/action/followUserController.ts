import { PrismaFollowsRepository } from "@/repositories/prisma/prismaFollowsRepository";
import { PrismaProfilesRepository } from "@/repositories/prisma/prismaProfilesRepository";
import { FollowUserService } from "@/services/actionServices/followUserService";
import { UserDoesNotExistsError } from "@/services/errors/userDoesNotExistsError";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function followUser(request: FastifyRequest, reply: FastifyReply) {

    try {
        const user = z.object({ id: z.string() }).parse(request.user)

        const FollowRequestSchema = z.object({
            followedId: z.string().uuid("Is not an id"),
        })
    
        const { followedId } = FollowRequestSchema.parse(request.body)
    
        const followsRepository = new PrismaFollowsRepository()
        const profilesRepository = new PrismaProfilesRepository()
        const followUserService = new FollowUserService(followsRepository, profilesRepository)
    
        const follower = await profilesRepository.findByUserId(user.id)

        if(!follower){
            throw new UserDoesNotExistsError("The follower was not found")
        }

        await followUserService.execute(follower.id, followedId)

        reply.status(201).send()
    }
    catch(err) {
        if(err instanceof UserDoesNotExistsError){
            reply.status(404).send({
                message: err.message,
            })
        }
        reply.status(500).send({
            message: (err as Error).message
        })
    }
}