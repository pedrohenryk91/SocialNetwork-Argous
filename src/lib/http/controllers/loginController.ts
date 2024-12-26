import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../prisma";
import { comparePassword } from "../../tools";

export async function login(request: FastifyRequest, reply: FastifyReply){
    const {email, password} = z.object({
        email: z.string().email({
            message:"Invalid Email"
        }),
        password: z.string()
    }).parse(request.body)

    const userValidation = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!userValidation){
        reply.status(404).send({
            Description:"User not found"
        })
        return
    }

    if(await comparePassword(password,userValidation.password)){
        const token = await reply.jwtSign({id:userValidation.id},{expiresIn: "1h"})
        reply.status(202).send({ token })
    }
    else{
        reply.send(401).send({
            Description:"Invalid Password"
        })
    }
}