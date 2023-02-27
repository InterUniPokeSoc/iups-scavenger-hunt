import { Answer } from '@/models/Answer'

export class Hint {
    id: number
    huntId: number
    question: string
    imageUrl: string | null
    order: number
    maxValue: number
    userScore: number | null
    answers: Answer[] | null
    userAnswer: string | null

    constructor(id: number,
        huntId: number,
        question: string,
        imageUrl: string | null = null, 
        order: number, 
        maxValue: number,
        userScore: number | null = null,
        answers: Answer[] | null = null,
        userAnswer: string | null = null) {

        this.id = id
        this.huntId = huntId
        this.question = question
        this.imageUrl = imageUrl
        this.order = order
        this.maxValue = maxValue
        this.userScore = userScore
        this.answers = answers
        this.userAnswer = userAnswer
    }
}