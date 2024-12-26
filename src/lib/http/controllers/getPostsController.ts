import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma";
import { PostInfoRepo } from "../../../repositories/PostsRepository";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub
    const posts = await prisma.post.findMany({
        where:{
            authorId: userId
        }
    })

    const postsInfo: PostInfoRepo[] = []

    posts.forEach(async (value, key)=>{
        let tmp = await prisma.postInfo.findUnique({
            where:{
                id: value.id
            }
        
        })
        if(tmp){
            const info: PostInfoRepo = tmp
            postsInfo[key] = info
        }
    })

    reply.status(200).send({
        posts: [...postsInfo]
    })
}