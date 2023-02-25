export class Response {
    id: number
    huntId: number
    participationId: number
    score: number

    constructor(id: number,
        hintId: number,
        participationId: number,
        score: number) {

        this.id = id
        this.huntId = hintId
        this.participationId = participationId
        this.score = score
    }
}