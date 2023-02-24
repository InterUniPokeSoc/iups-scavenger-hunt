export class Answer {
    id: number
    hintId: number
    answer: string
    percentageValue: string

    constructor(id: number,
        hintId: number,
        answer: string,
        percentageValue: string) {

        this.id = id
        this.hintId = hintId
        this.answer = answer
        this.percentageValue = percentageValue
    }
}