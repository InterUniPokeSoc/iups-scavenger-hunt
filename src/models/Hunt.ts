export class Hunt {
    id: number
    startDate: Date
    endDate: Date
    hidden: boolean
    score: number
    maxScore: number
    hasParticipation: boolean
    tier: string | null

    constructor(id: number,
        startDate: Date,
        endDate: Date,
        hidden: boolean,
        score: number,
        maxScore: number,
        hasParticipation: boolean,
        tier: string | null = null) {

        this.id = id
        this.startDate = startDate
        this.endDate = endDate
        this.hidden = hidden
        this.score = score
        this.maxScore = maxScore
        this.hasParticipation = hasParticipation
        this.tier = tier
    }
}