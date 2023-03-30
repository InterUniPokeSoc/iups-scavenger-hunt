export class Participation {
    id: number
    huntId: number
    excluded: Boolean | null

    constructor(id: number,
        huntId: number,
        excluded: Boolean) {

        this.id = id
        this.huntId = huntId
        this.excluded = excluded
    }
}