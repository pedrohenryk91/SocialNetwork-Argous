import { UsersRepository } from "@/repositories/usersRepository";

interface EditUserRequest{
    id: string,
    username?: string,
    birthday?: Date,
    description?: string,
}

export class EditUserInfoService {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        id,
        username,
        birthday,
        description,
    }: EditUserRequest){

        if(username || birthday || description) {
            await this.usersRepository.update(id, {}, {
                birthday,
                username,
                description,
            })
            return "Changes applied!"
        } else {
            return "User did not make any changes"
        }
    }
}