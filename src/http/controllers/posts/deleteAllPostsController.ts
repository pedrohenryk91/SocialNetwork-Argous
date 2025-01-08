import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { DeletePostService } from "@/services/postsServices/deletePostService"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteAllPosts(request: FastifyRequest, reply: FastifyReply){
    try {
        const user = z.object({ id: z.string() }).parse(request.user)

        const prismaPostsRepository = new PrismaPostsRepository()
        const deletePostService = new DeletePostService(prismaPostsRepository)

        await deletePostService.deleteManyByAuthor(user.id)

        reply.status(200).send()
    }
    catch(err) {
        throw err
    }
}