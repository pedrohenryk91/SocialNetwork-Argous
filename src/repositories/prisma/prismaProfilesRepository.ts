import { Prisma, UserProfile } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProfilesRepository } from "../profilesRepository";

export class PrismaProfilesRepository implements ProfilesRepository {
    async create(data: Prisma.UserProfileCreateInput){
        const profile = await prisma.userProfile.create({
            data,
        })

        return profile
    }

    async findByUserId(id: string): Promise<UserProfile | null> {
        const user = await prisma.user.findUnique({
            where:{
                id,
            }
        })

        if(!user)
            return null
        
        const profile = await prisma.userProfile.findUnique({
            where:{
                id: user.profileId
            }
        })

        return profile
    }
}