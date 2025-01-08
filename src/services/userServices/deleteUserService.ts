import { UsersRepository } from "@/repositories/usersRepository";
import { UserDoesNotExistsError } from "../errors/userDoesNotExistsError";

export class DeleteUserService {
    constructor(private usersRepository: UsersRepository){}

    async execute(id: string){
        const doesUserExists = await this.usersRepository.findById(id)

        if(!doesUserExists){
            throw new UserDoesNotExistsError()
        }

        this.usersRepository.delete(id)
    }
}