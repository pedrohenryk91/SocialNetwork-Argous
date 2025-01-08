import { Prisma, UserProfile } from "@prisma/client";

export interface ProfilesRepository {
    create(data: Prisma.UserProfileCreateInput): Promise<UserProfile>
    findByUserId(id: string): Promise<UserProfile | null>
}