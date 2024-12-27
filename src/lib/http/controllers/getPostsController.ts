import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma";
import { z } from "zod";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    const reqUser = z.object({
        id:z.string()
    }).parse(request.user)

    const posts = await prisma.post.findMany({
        where:{
            authorId: reqUser.id
        }
    })

    const postsInfo: object[] = []

    for(const value of posts){
        let info = await prisma.postInfo.findUnique({
            where:{
                id: value.infoId,
                posted: true
            }
        })
        if(info){
            postsInfo.push(info)
        }
    }

    reply.status(200).send({
        posts: [...postsInfo]
    })
}