import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../prisma"
import { z } from "zod"

export async function createPost(request: FastifyRequest, reply: FastifyReply){
    const user = z.object({
        id:z.string()
    }).parse(request.user)

    const {title, textContent} = z.object({
        title:z.string(),
        textContent:z.string().optional()
    }).parse(request.body)

    try {

        const {posted} = z.object({
            posted:z.string()
        }).parse(request.params)

        const status = (posted == "yes" ? true : false)

        const postInfo = await prisma.postInfo.create({
            data:{
                title,
                textContent,
                posted: status
            }
        })

        const post = await prisma.post.create({
            data:{
                authorId: user.id,
                infoId: postInfo.id
            }
            
        })

        reply.status(201).send()

    }
    catch(err){
        reply.send({
            Error: err
        });
    }
}