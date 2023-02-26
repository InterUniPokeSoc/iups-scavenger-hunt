import { supabase } from '@/services/Supabase'
import { ParticipationService } from '@/services/ParticipationService'
import { ResponseService } from '@/services/ResponseService'
import { Hunt } from '@/models/Hunt'

export class HuntService {
    static readonly huntFetchError = new Error("No Hunts Found")

    static async fetchHunts(userId: string): Promise<Hunt[]> {
        const participations = await ParticipationService.fetchParticipatingHuntIdsFor(userId)

        const currentDate = new Date().toISOString()

        // Show open hunts or those that the user has participated in.
        const { data: hunts, error: error } = await supabase
            .from('hunt')
            .select('*')
            .eq('hidden', false)
            .or(`id.in.(${participations}), end_date.gte.${currentDate}`)

        if (!hunts || error) throw this.huntFetchError

        const huntIds = hunts.flatMap((hunt) => { return hunt.id })

        // Find all responses so that the total score for each hunt can be calculated.
        const scores = await ResponseService.fetchScoresFor(huntIds, userId)

        return hunts.map((hunt) => {
            const huntScores = scores.filter((score) => { 
                if (score.huntId == hunt.id) return score
            })

            const hasParticipation = participations.includes(hunt.id)

            if (huntScores) {
                const score = huntScores.reduce((sum, huntScore) => sum += huntScore.score, 0)

                return new Hunt(hunt.id, hunt.start_date, hunt.end_date, hunt.hidden, score, hasParticipation)
            }

            return new Hunt(hunt.id, hunt.start_date, hunt.end_date, hunt.hidden, 0, hasParticipation)
        })
    }
}