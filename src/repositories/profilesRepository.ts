import { Prisma, UserProfile } from "@prisma/client";

export interface ProfilesRepository {
    create(data: Prisma.UserProfileCreateInput): Promise<UserProfile>
    findById(id: string): Promise<UserProfile | null>
    findByUserId(userId: string): Promise<UserProfile | null>
    findManyByUsername(username: string, take?: number): Promise<UserProfile[] | null>
}