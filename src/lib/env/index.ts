import { z } from "zod";
import "dotenv/config"

export const {PORT,HOST,SECRET} = z.object({
    PORT:z.string(),
    HOST:z.string(),
    SECRET:z.string()
}).parse(process.env)