import { UsersRepository } from "../usersRepository";
import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository{
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })

        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where:{
                id,
            }
        })

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where:{
                email
            },
        })

        return user
    }

    async update(id: string, data: Prisma.UserUpdateInput, profileData?: Prisma.UserProfileUpdateInput){
        const user = await prisma.user.update({
            where:{
                id
            },
            data,
        })
        if(profileData){
            await prisma.userProfile.update({
                where:{
                    id: user.profileId
                },
                data: profileData
            })
        }
    }

    async delete(id: string): Promise<void> {
        await prisma.$transaction(async (prisma)=>{
            
            const posts = await prisma.post.findMany({
                where:{
                    authorId:id,
                },
                include:{
                    content:true
                }
            })

            await prisma.post.deleteMany({
                where:{
                    authorId:id,
                }
            })

            for(let post of posts){
                await prisma.postContent.delete({
                    where:{
                        id:post.content.id
                    }
                })
            }

            const deletedUser = await prisma.user.delete({
                where:{
                    id,
                }
            })

            await prisma.userProfile.delete({
                where:{
                    id: deletedUser.profileId
                }
            })
        })
    }
}