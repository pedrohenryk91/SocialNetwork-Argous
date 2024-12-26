import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyJsonWebTokenIsSigned";
import { getUserInfo } from "./controllers/getUserInfoController";
import { registerUser } from "./controllers/registerUserController";
import { login } from "./controllers/loginController";
import { createPost } from "./controllers/createPostController";
import { defineUserName } from "./controllers/usernameController";

export async function userRouter(app: FastifyInstance){
    app.get("/user/info",{preHandler: verifyToken}, getUserInfo)
    app.post("/posts/create/:posted", {preHandler: verifyToken}, createPost)
    app.post("/register", registerUser)
    app.post("/login", login)
    app.put("/user/name/:username", {preHandler: verifyToken}, defineUserName)
}