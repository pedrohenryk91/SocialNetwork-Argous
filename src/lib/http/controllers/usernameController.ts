import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma";
import { z } from "zod";

export async function defineUserName(request: FastifyRequest, reply: FastifyReply){

    try {
        const reqUser = z.object({
            id: z.string()
        }).parse(request.user)

        const {username} = z.object({
            username:z.string()
        }).parse(request.params)

        const u = await prisma.user.update({
            where:{
                id: reqUser.id
            },
            data:{
                userName: username
            }
        })

        reply.status(201).send({
            username
        })
    }
    catch(err){
        reply.send({
            err
        })
    }

}