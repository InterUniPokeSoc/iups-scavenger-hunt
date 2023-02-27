export class Response {
    id: number
    huntId: number
    participationId: number
    score: number
    answerText: string

    constructor(id: number,
        hintId: number,
        participationId: number,
        score: number,
        answerText: string) {

        this.id = id
        this.huntId = hintId
        this.participationId = participationId
        this.score = score
        this.answerText = answerText
    }
}