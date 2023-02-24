export class Hint {
    id: number
    huntId: number
    question: string
    imageUrl: string | null
    order: number
    max_value: number

    constructor(id: number,
        hintId: number,
        question: string,
        imageUrl: string | null = null, 
        order: number, 
        max_value: number) {

        this.id = id
        this.huntId = hintId
        this.question = question
        this.imageUrl = imageUrl
        this.order = order
        this.max_value = max_value
    }
}