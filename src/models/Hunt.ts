export class Hunt {
    id: number
    startDate: Date
    endDate: Date
    hidden: boolean
    score: number
    hasParticipation: boolean

    constructor(id: number,
        startDate: Date,
        endDate: Date,
        hidden: boolean,
        score: number,
        hasParticipation: boolean) {

        this.id = id
        this.startDate = startDate
        this.endDate = endDate
        this.hidden = hidden
        this.score = score
        this.hasParticipation = hasParticipation
    }
}