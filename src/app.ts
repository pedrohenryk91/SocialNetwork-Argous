import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { env } from "./lib/env"
import { router } from "@http/routes"
import { ZodError } from "zod"
import { actionsRouter } from "./http/actionsRoutes"

export const app = fastify()

app.register(cors, {
    origin:"*",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials: true
})

app.register(fastifyJwt, {secret: env.SECRET},)
app.register(router)
app.register(actionsRouter, {prefix:"/action"})

app.setErrorHandler((error, request, reply)=>{
    if(error instanceof ZodError){
        return reply.status(400).send({
            message: "Validation Error",
            issue: error.format(),
        })
    }

    if(env.NODE_ENV !== "production") {
        console.error(error)
    }

    return reply.status(500).send({
        message: "Internal Server Error"
    })
})