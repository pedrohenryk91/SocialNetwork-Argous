export class UserDoesNotExistsError extends Error {
    constructor(){
        super("The user does not exists")
    }
}