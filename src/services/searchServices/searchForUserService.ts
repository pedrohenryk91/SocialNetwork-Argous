import { ProfilesRepository } from "@/repositories/profilesRepository";

export class SearchForUserService {
    constructor(private profilesRepository: ProfilesRepository){}
    async execute(username: string, take?: number){
        return this.profilesRepository.findManyByUsername(username, take)
    }
}