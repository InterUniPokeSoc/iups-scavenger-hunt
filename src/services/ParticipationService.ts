import { supabase } from '@/services/Supabase'
import { Participation } from '@/models/Participation'

export class ParticipationService {

    static readonly participationFetchError = new Error("No Participations Found")

    static async fetchParticipationsFor(userId: string): Promise<Participation[]> {
        const { data: participations, error: error } = await supabase
            .from('participation')
            .select('*')
            .eq('user_id', userId)

        if (participations == null) return []

        return participations.map((participation) => {
            return new Participation(participation.id, participation.hunt_id)
        })
    }

    static async fetchParticipatingHuntIdsFor(userId: string): Promise<number[]> {
        const { data: participations, error: error } = await supabase
            .from('participation')
            .select('hunt_id')
            .eq('user_id', userId)

        if (participations == null) return []

        return participations.map((participation) => {
            return participation.hunt_id
        })
    }
}