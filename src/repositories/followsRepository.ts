import { Follow } from "@prisma/client";

export interface FollowsRepository {
    create(followerId: string, followedId: string): Promise<Follow>
}