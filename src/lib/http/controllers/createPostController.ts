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

        const {status} = z.object({
            status:z.enum(["yes","no"])
        }).parse(request.params)

        const posted = (status == "yes" ? true : false)

        const postInfo = await prisma.postInfo.create({
            data:{
                title,
                textContent,
                posted
            }
        })

        const post = await prisma.post.create({
            data:{
                authorId: user.id,
                infoId: postInfo.id
            }
        })

        console.log(post)
        console.log(postInfo)

        reply.status(201).send()

    }
    catch(err){
        reply.send({
            Error: err
        });
    }
}