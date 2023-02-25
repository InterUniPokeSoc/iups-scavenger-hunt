import { supabase } from '@/services/Supabase'
import { ParticipationService } from '@/services/ParticipationService'
import { Hunt } from '@/models/Hunt'

export class HuntService {
    static readonly huntFetchError = new Error("No Hunts Found")

    static async fetchHunts(userId: string): Promise<Hunt[]> {
        const participations = await ParticipationService.fetchParticipatingHuntIdsFor(userId)

        const { data: hunts, error: error } = await supabase
            .from('hunt')
            .select('*')
            .eq('hidden', false)
            .in('id', participations)

        if (!hunts || error) throw this.huntFetchError

        return hunts.map((hunt) => {
            return new Hunt(hunt.id, hunt.start_date, hunt.end_date, hunt.hidden)
        })
    }
}