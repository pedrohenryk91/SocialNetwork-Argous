export class FailedToFollowError extends Error {
    constructor(message?: string){
        if(message){
            super(message)
        }
        else super("Failed to create a follow relation")
    }
}