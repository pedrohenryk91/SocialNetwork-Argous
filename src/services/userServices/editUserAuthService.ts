import { UsersRepository } from "@/repositories/usersRepository";
import { comparePassword, hashPassword } from "@/utils/tools";
import { IncorrectPasswordError } from "../errors/incorrectPasswordError";

interface EditUserAuthRequest {
    id: string,
    old_password: string,
    new_password?: string,
    email?: string,
}

export class EditUserAuthService {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        id,
        old_password,
        new_password,
        email,
    }: EditUserAuthRequest){
        const user = await this.usersRepository.findById(id)
        if(user){
            if(!comparePassword(old_password, user.password))
                throw new IncorrectPasswordError()
        }
        if(new_password || email){
            const password = (new_password ? await hashPassword(new_password) : undefined)
            await this.usersRepository.update(id, {
                email,
                password,
            })
            return "Changes applied!"
        } else
            return "User did not make any changes"
    }
}