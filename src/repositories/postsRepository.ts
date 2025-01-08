import { Post, Prisma } from "@prisma/client";

export interface PostsRepository {
    create(data: Prisma.PostCreateInput): Promise<Post>
    findById(id: string): Promise<Post | null>
    findByContent(contentId: string): Promise<Post | null>
    findManyByAuthor(authorId: string): Promise<Post[] | null>
    delete(id: string): Promise<void>
    deleteByContent(contentId: string): Promise<void>
    deleteManyByAuthor(authorId: string): Promise<void>
    updateById(id: string, args: Prisma.PostContentUpdateInput): Promise<Post>
    updateByContent(contentId: string, data: Prisma.PostContentUpdateInput): Promise<Post>
}