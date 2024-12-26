import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { hashPassword } from "../../tools";
import { prisma } from "../../prisma";

export async function registerUser(request: FastifyRequest, reply: FastifyReply){

        const {email, password} = z.object({
            email:    z.string().email(),
            password: z.string().min(6)
        }).parse(request.body)

        const hashedPassword = await hashPassword(password)
    
        try{
    
            const userCreatedSuccesfully = await prisma.user.create({
                data:{
                    email,
                    password: hashedPassword
                }
            })

            console.log("Usuario criado com sucesso")
    
            reply.status(201).send()
    
        }
        catch(err){
            reply.status(417).send({
                Error: err
            })
        }
    
    }