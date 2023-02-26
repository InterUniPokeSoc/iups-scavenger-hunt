export class Hint {
    id: number
    huntId: number
    question: string
    imageUrl: string | null
    order: number
    maxValue: number
    userScore: number | null

    constructor(id: number,
        huntId: number,
        question: string,
        imageUrl: string | null = null, 
        order: number, 
        maxValue: number,
        userScore: number | null = null) {

        this.id = id
        this.huntId = huntId
        this.question = question
        this.imageUrl = imageUrl
        this.order = order
        this.maxValue = maxValue
        this.userScore = userScore
    }
}