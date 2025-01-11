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

    async findById(id: string) {
        const profile = await prisma.userProfile.findUnique({
            where:{
                id,
            }
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

    async findManyByUsername(username: string, take?: number) {
        return await prisma.userProfile.findMany({
            take,
            where:{
                OR: [
                    {username: {equals: username}},
                    {username: {contains: username}},
                ],
            }
        })
    }
}