import { PostsRepository } from "../postsRepository";
import { Post, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaPostsRepository implements PostsRepository{
    async create(data: Prisma.PostCreateInput): Promise<Post> {
        const post = await prisma.post.create({
            data,
        })

        return post
    }

    async findById(id: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where:{
                id,
            }
        })

        return post
    }

    async findByContent(contentId: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where:{
                contentId,
            }
        })

        return post
    }

    async findManyByAuthor(authorId: string): Promise<Post[] | null> {
        const post = await prisma.post.findMany({
            where:{
                authorId,
            },
            include:{
                content: true
            }
        })

        return post
    }

    async delete(id: string): Promise<void> {
        await prisma.$transaction(async (prisma)=>{
            const post = await prisma.post.delete({
                where:{
                    id,
                },
                include:{
                    content:true
                }
            })
    
            await prisma.postContent.delete({
                where:{
                    id: post.contentId
                }
            })
        })
    }

    async deleteByContent(contentId: string): Promise<void> {
        await prisma.$transaction(async (prisma)=>{
            await prisma.post.delete({
                where:{
                    contentId,
                },
                include:{
                    content: true
                }
            })
    
            await prisma.postContent.delete({
                where:{
                    id: contentId
                }
            })
        })
    }

    async deleteManyByAuthor(authorId: string): Promise<void> {
        await prisma.$transaction(async (prisma)=>{
            const posts =  await prisma.post.findMany({
                where:{
                    authorId,
                }
            })
            await prisma.post.deleteMany({
                where:{
                    authorId,
                },
            })
            for(let post of posts){
                await prisma.postContent.delete({
                    where:{
                        id:post.contentId
                    }
                })
            }
        })
    }

    async updateById(id: string, data: Prisma.PostContentUpdateInput): Promise<Post> {
        const post = await prisma.post.update({
            where:{
                id,
            },
            data,
        })

        return post
    }

    async updateByContent(contentId: string, data: Prisma.PostContentUpdateInput): Promise<Post> {
        const post = await prisma.post.update({
            where:{
                contentId,
            },
            data,
        })

        return post
    }
}