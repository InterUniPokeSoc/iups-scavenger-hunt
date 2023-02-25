export class Hunt {
    id: number
    startDate: Date
    endDate: Date
    hidden: boolean
    score: number

    constructor(id: number,
        startDate: Date,
        endDate: Date,
        hidden: boolean,
        score: number) {

        this.id = id
        this.startDate = startDate
        this.endDate = endDate
        this.hidden = hidden
        this.score = score
    }
}