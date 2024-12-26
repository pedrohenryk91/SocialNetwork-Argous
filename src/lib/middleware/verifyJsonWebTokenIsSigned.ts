import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyToken(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify()
    }
    catch(err){
        reply.status(401).send({
            Error: "Unauthorized Action",
            Description: err
        })
    }
}