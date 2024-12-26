export interface PostRepo {
    id:       string,
    authorId: string,
    infoId:   string
}

export interface PostInfoRepo {
    readonly id: string,
    title:       string,
    textContent: string | null,
    createdAt:   Date,
    updatedAt:   Date | null,
    posted:      Boolean
}