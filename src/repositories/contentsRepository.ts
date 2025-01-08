import { PostContent } from "@prisma/client";

export interface ContentsRepository {
    findManyByAuthor(authorId: string): Promise<PostContent[] | null>
}