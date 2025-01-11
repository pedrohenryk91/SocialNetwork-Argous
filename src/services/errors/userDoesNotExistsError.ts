export class UserDoesNotExistsError extends Error {
    constructor(message?: string){
        if(!message) super("The user does not exists")
        else super(message)
    }
}