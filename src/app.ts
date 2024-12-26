import { comparePassword, hashPassword } from "./lib/tools"
import { prisma } from "./lib/prisma"
import fastify from "fastify"
import { z } from "zod"
import fastifyJwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { SECRET } from "./lib/env"
import { userRouter } from "./lib/http/routes"
import { verifyToken } from "./lib/middleware/verifyJsonWebTokenIsSigned"

export const app = fastify()

app.register(cors, {
    origin:"*",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials: true
})

app.register(fastifyJwt, {secret: SECRET})
app.register(userRouter)