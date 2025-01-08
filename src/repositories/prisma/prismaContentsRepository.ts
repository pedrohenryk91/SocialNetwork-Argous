import { PostContent } from "@prisma/client";
import { ContentsRepository } from "../contentsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaContentsRepository implements ContentsRepository {
    async findManyByAuthor(authorId: string) {
        const contents = await prisma.postContent.findMany({
            where:{
                post:{
                    authorId,
                }
            }
        })

        return contents
    }
}