import { FastifyInstance } from "fastify";
import { verifyToken } from "./middleware/verifyJsonWebTokenIsSigned";
import { followUser } from "./controllers/action/followUserController";

export async function actionsRouter(app: FastifyInstance) {
    app.post("/follow", {preHandler: verifyToken}, followUser)
    //Next routes:
    //Unfollow
    //Like
    //Unlike
    //Dislike
    //Comment
    //Delete comment
}