import { FollowsRepository } from "../followsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaFollowsRepository implements FollowsRepository {
    async create(followerId: string, followedId: string) {
        const follow = await prisma.follow.create({
            data:{
                followerId,
                followedId,
            }
        })
        return follow
    }
}