
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { EmailAlreadyInUseError } from "@/services/errors/emailAlreadyInUseError";
import { RegisterUserService } from "@/services/userServices/registerUserService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerUser(request: FastifyRequest, reply: FastifyReply){
    try {
        const registerUserSchema = z.object({
            email:     z.string().email({message:"Invalid Email"}).toLowerCase(),
            password:  z.string().min(6),
            birthday:  z.string().transform((str) => new Date(str)).pipe(z.date())
        })

        const {email, password, birthday} = registerUserSchema.parse(request.body)

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUserService = new RegisterUserService(prismaUsersRepository)

        await registerUserService.execute({
            email,
            password,
            birthday
        })

        reply.status(201).send()
    }
    catch(err){ 
        if(err instanceof EmailAlreadyInUseError){
            reply.status(409).send({
                message: err.message
            })
        }

        throw err
    }
}