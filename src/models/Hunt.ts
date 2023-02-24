export class Hunt {
    id: number
    startDate: Date
    endDate: Date
    hidden: boolean

    constructor(id: number,
        startDate: Date,
        endDate: Date,
        hidden: boolean) {

        this.id = id
        this.startDate = startDate
        this.endDate = endDate
        this.hidden = hidden
    }
}