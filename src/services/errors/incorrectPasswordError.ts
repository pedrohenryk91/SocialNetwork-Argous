export class IncorrectPasswordError extends Error {
    constructor(){
        super("Incorret password")
    }
}