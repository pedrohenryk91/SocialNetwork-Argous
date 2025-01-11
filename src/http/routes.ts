import { FastifyInstance } from "fastify";
import { verifyToken } from "./middleware/verifyJsonWebTokenIsSigned";
import { getUserProfile } from "./controllers/users/getUserProfileController";
import { registerUser } from "./controllers/users/registerUserController";
import { login } from "./controllers/loginController";
import { editUserInfo } from "./controllers/users/editUserInfoController";
import { getPosts } from "./controllers/posts/getPostsController";
import { createPost } from "./controllers/posts/createPostController";
import { deletePost } from "./controllers/posts/deletePostController";
import { editPost } from "./controllers/posts/editPostController";
import { deleteUser } from "./controllers/users/deleteUserController";
import { deleteAllPosts } from "./controllers/posts/deleteAllPostsController";
import { editUserAuth } from "./controllers/users/editUserAuthController";
import { searchUsers } from "./controllers/search/searchUsersController";
import { searchFollowers } from "./controllers/search/searchFollowersController";

export async function router(app: FastifyInstance){
    app.post("/user/register", registerUser)
    app.get("/user/profile",{preHandler: verifyToken}, getUserProfile)
    app.put("/user/edit/profile", {preHandler: verifyToken}, editUserInfo)
    app.put("/user/edit", {preHandler: verifyToken}, editUserAuth)
    app.delete("/user/delete", {preHandler: verifyToken}, deleteUser)

    app.post("/posts/create/:posted", {preHandler: verifyToken}, createPost)
    app.get("/posts/get", {preHandler: verifyToken}, getPosts)
    app.put("/posts/edit", {preHandler: verifyToken}, editPost)
    app.delete("/posts/delete", {preHandler: verifyToken}, deletePost)
    app.delete("/posts/delete/all", {preHandler: verifyToken}, deleteAllPosts)

    app.get("/search/user", searchUsers)
    app.get("/search/followers", {preHandler: verifyToken}, searchFollowers) // <----- #TODO

    //#TODO
    //Query route
    //Localização
    //Following
    //Likes

    app.post("/login", login)
}