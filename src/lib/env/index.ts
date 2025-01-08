import { z } from "zod";
import "dotenv/config"

const envSchema = z.object({
    NODE_ENV: z.enum(["dev","test","production"]).default("dev"),
    PORT:z.string(),
    HOST:z.string(),
    SECRET:z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error("Invalid Environment Variables", _env.error.format())
    throw new Error("Invalid Environment Variables")
}

export const env = _env.data