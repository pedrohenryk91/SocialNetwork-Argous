import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserInfo(request: FastifyRequest) {
    console.log("GETUSERINFO")
    return "ola"
}