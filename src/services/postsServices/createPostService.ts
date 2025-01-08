import { PostsRepository } from "@/repositories/postsRepository"
import { UsersRepository } from "@/repositories/usersRepository"
import { UserDoesNotExistsError } from "../errors/userDoesNotExistsError"

interface RegisterPostRequest {
    authorId: string,
    title: string,
    textContent?: string,
    postedAt?: Date
}

export class CreatePostService {
    constructor(private postsRepository: PostsRepository, private usersRepository: UsersRepository){}

    async execute({
        authorId,
        title,
        textContent,
        postedAt
    }: RegisterPostRequest){
        const doesUserExists = await this.usersRepository.findById(authorId)

        if(!doesUserExists){
            throw new UserDoesNotExistsError()
        }

        this.postsRepository.create({
            author:{
                connect:{
                    id: authorId
                }
            },
            content:{
                create:{
                    title,
                    textContent,
                    postedAt
                }
            }
        })
    }
}