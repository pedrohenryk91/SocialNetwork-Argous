import { app } from "./app";
import { env } from "./lib/env";

app.listen({
    port:Number(env.PORT),
    host:env.HOST
},(err, path)=>{
    console.log(err || `The Api is Running on ${path}`)
})