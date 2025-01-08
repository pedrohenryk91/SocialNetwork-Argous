import { ProfilesRepository } from "@/repositories/profilesRepository";
import { UserDoesNotExistsError } from "../errors/userDoesNotExistsError";

export class GetUserProfileService {
    constructor(private profilesRepository: ProfilesRepository){}
    async execute(id: string){
        const profile = await this.profilesRepository.findByUserId(id)
        
        if(!profile)
            throw new UserDoesNotExistsError()

        return profile
    }
}