import { supabase } from '@/services/Supabase'
import { Participation } from '@/models/Participation'

export class ParticipationService {

    static readonly participationFetchError = new Error("No Participations Found")

    static readonly participationJoinError = new Error("Participation Join Error")

    static async fetchParticipationIdFor(huntId: number, userId: string): Promise<number> {
        const { data: participations, error: error } = await supabase
            .from('participation')
            .select('*')
            .eq('hunt_id', huntId)
            .eq('user_id', userId)

        if (participations == null || participations[0] == null) throw this.participationFetchError

        let participation = participations[0]

        return participation.id
    }

    static async fetchParticipationsFor(userId: string): Promise<Participation[]> {
        const { data: participations, error: error } = await supabase
            .from('participation')
            .select('*')
            .eq('user_id', userId)

        if (participations == null) return []

        return participations.map((participation) => {
            return new Participation(participation.id, participation.hunt_id, participation.excluded)
        })
    }

    // static async fetchParticipatingHuntIdsFor(userId: string): Promise<number[]> {
    //     const { data: participations, error: error } = await supabase
    //         .from('participation')
    //         .select('hunt_id')
    //         .eq('user_id', userId)

    //     if (participations == null) return []

    //     return participations.map((participation) => {
    //         return participation.hunt_id
    //     })
    // }

    // static async fetchExcludedScoreHuntIdsFor(userId: string): Promise<number[]> {
    //     const { data: participations, error: error } = await supabase
    //         .from('participation')
    //         .select('hunt_id')
    //         .eq('user_id', userId)
    //         .eq('excluded', true)

    //     if (participations == null) return []

    //     return participations.map((participation) => {
    //         return participation.hunt_id
    //     })
    // }

    static async addParticipationFor(huntId: number, userId: string) {
        const { data: result, error: error } = await supabase
            .from('participation')
            .insert([{ user_id: userId, hunt_id: huntId }])

        if (error) throw this.participationJoinError
    }
}