import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetPostsService } from "@/services/postsServices/getPostsService";
import { PrismaContentsRepository } from "@/repositories/prisma/prismaContentsRepository";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    const user = z.object({
        id:z.string()
    }).parse(request.user)

    const contentsRepository = new PrismaContentsRepository()
    const getPostsService = new GetPostsService(contentsRepository)

    const postsContents = await getPostsService.execute(user.id)

    if(!postsContents){
        return reply.status(200).send({
            posts: [],
            message: "User does not have posts"
        })
    }

    reply.status(200).send({
        posts: [...postsContents]
    })
}