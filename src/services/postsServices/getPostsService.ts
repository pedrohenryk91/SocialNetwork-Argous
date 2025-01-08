import { ContentsRepository } from "@/repositories/contentsRepository";

export class GetPostsService {
    constructor(private contentsRepository: ContentsRepository){}
    async execute(id: string){
        return this.contentsRepository.findManyByAuthor(id)
    }
}