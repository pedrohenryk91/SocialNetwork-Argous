import { Prisma, User, UserProfile } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { UserDoesNotExistsError } from "@/services/errors/userDoesNotExistsError";

class inMemoryUsersRepository implements UsersRepository {
    public users: User[] = []
    public profiles: UserProfile[] = []
    private count = 0

    async create(data: Prisma.UserCreateInput) {
        this.count++
        if(!data.profile.create){
            throw new Error()
        }
        const profile = {
            id: "profile-" + this.count,
            username: null,
            description: null,
            birthday: new Date(data.profile.create.birthday)
        }
        this.profiles.push(profile)
        const user = {
            id: "user-" + this.count,
            email: data.email,
            password: data.password,
            profileId: profile.id
        }
        this.users.push(user)
        return user
    }

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email)
        if(user) return user
        return null
    }

    async findById(id: string) {
        const user = this.users.find(user => user.id === id)
        if(user) return user
        return null
    }

    async delete(id: string) {
        const removed_user = this.users.find(user => user.id === id)
        const new_list = this.users.filter(user => user != removed_user)
        this.users = new_list
    }

    async update(id: string, data: Prisma.UserUpdateInput, profileData?: Prisma.UserProfileUpdateInput) {}
}