import { PostsRepository } from "@/repositories/postsRepository";

interface EditPostParams {
    contentId: string,
    title?: string,
    textContent?: string,
}

export class EditPostService {
    constructor(private postsRepository: PostsRepository){}

    async execute({
        contentId,
        textContent,
        title
    }: EditPostParams){

        if(textContent || title){
            await this.postsRepository.updateByContent(contentId,{
                title,
                textContent,
                updatedAt: new Date()
            })
            return "Changes applied"
        }
        else {
            return "User did not make any changes"
        }

    }
}