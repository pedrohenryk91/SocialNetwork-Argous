import { EmailAlreadyInUseError } from "../errors/emailAlreadyInUseError"
import { UsersRepository } from "@/repositories/usersRepository"
import { hashPassword } from "@/utils/tools"
import { User } from "@prisma/client"

interface RegisterUserRequest {
    email: string,
    password: string,
    birthday: Date
}

interface RegisterUserResponse {
    user: User
}

export class RegisterUserService {
    constructor(private userRepository: UsersRepository){}
    async execute({
        email,
        password,
        birthday
    }: RegisterUserRequest): Promise<RegisterUserResponse> {
        const emailAlreadyInUse = await this.userRepository.findByEmail(email)
    
        if(emailAlreadyInUse) {
            throw new EmailAlreadyInUseError()
        }
    
        const hashedPassword = await hashPassword(password)
    
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            profile:{
                create:{
                    birthday
                }
            }
        })

        return {
            user,
        }

    }
}

