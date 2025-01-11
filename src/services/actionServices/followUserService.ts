import { FollowsRepository } from "@/repositories/followsRepository";
import { ProfilesRepository } from "@/repositories/profilesRepository";
import { UserDoesNotExistsError } from "../errors/userDoesNotExistsError";

export class FollowUserService {
    constructor(private followsRepository: FollowsRepository,
                private profilesRepository: ProfilesRepository){}
    /**
     * Do the crime of stalking a person without been judged.
     * 
     * @param followerId The UserProfile id of the user thats doing the follow action, the creep
     * 
     * @param followedId The UserProfile id of the user thats been followed, the victim
     * 
     * @throws Throws UserDoesNotExistsError if any of the passed id's were not found
     * 
     * @returns An object with the Users Profiles
     */
    async execute(followerId: string, followedId: string){
        const follower = await this.profilesRepository.findById(followedId)
        const followed = await this.profilesRepository.findById(followedId)

        if(!follower) throw new UserDoesNotExistsError("The followerId was not found")
        if(!followed) throw new UserDoesNotExistsError("The followedId was not found")
        
        await this.followsRepository.create(followerId, followedId)

        return {
            follower,
            followed,
        }
    }
}