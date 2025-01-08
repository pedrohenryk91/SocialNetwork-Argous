import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { UserDoesNotExistsError } from "@/services/errors/userDoesNotExistsError"
import { CreatePostService } from "@/services/postsServices/createPostService"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createPost(request: FastifyRequest, reply: FastifyReply){
    try {
        const user = z.object({ id:z.string() }).parse(request.user)
    
        const requestBodySchema = z.object({
            title:z.string(),
            textContent:z.string().optional()
        })

        const requestParamsSchema = z.object({
            posted: z.string()
        })

        const {title, textContent} = requestBodySchema.parse(request.body)
        const {posted} = requestParamsSchema.parse(request.params)
        
        const postedAt = (posted === "yes" ? new Date() : undefined)

        const prismaPostsRepository = new PrismaPostsRepository()
        const prismaUsersRepository = new PrismaUsersRepository()
        const createPostService = new CreatePostService(prismaPostsRepository, prismaUsersRepository)

        await createPostService.execute({
            authorId: user.id,
            title,
            textContent,
            postedAt
        })

        reply.status(201).send()

    }
    catch(err){
        if(err instanceof UserDoesNotExistsError){
            reply.status(417).send({
                message: err.message
            })
        }

        throw err
    }
}