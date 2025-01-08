import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository";
import { EditPostService } from "@/services/postsServices/editPostService";

export async function editPost(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = z.object({ id: z.string() }).parse(request.user)

        const postContentSchema = z.object({
            id: z.string(),
            textContent: z.string().optional(),
        })

        const { title } = z.object({ title: z.string().optional() }).parse(request.query)
        const { id, textContent } = postContentSchema.parse(request.body)

        const prismaPostsRepository = new PrismaPostsRepository()
        const editPostService = new EditPostService(prismaPostsRepository)

        const message = await editPostService.execute({
            contentId: id,
            title,
            textContent,
        })

        reply.status(201).send({
            message: message,
        })
    }
    catch(err) {
        throw err
    }
}