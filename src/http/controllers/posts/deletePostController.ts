import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DeletePostService } from "@/services/postsServices/deletePostService";
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository";

export async function deletePost(request: FastifyRequest, reply: FastifyReply){
    try {
        const user = z.object({ id: z.string() }).parse(request.user)

        const { contentId } = z.object({ contentId: z.string() }).parse(request.body)

        const prismaPostsRepository = new PrismaPostsRepository()
        const deletePostService = new DeletePostService(prismaPostsRepository)

        await deletePostService.deleteByContent(contentId)

        reply.send(200).send()
    }
    catch(err) {
        reply.status(404).send({
            err
        })
    }
}