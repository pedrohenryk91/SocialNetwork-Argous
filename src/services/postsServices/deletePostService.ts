import { PostsRepository } from "@/repositories/postsRepository";

export class DeletePostService {
    constructor(private postsRepository: PostsRepository){}

    async delete(postId: string){
        await this.postsRepository.delete(postId)
    }

    async deleteByContent(contentId: string){
        await this.postsRepository.deleteByContent(contentId)
    }

    async deleteManyByAuthor(authorId: string){
        await this.postsRepository.deleteManyByAuthor(authorId)
    }
}