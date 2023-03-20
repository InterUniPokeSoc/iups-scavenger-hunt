import { supabase } from '@/services/Supabase'
import { ParticipationService } from '@/services/ParticipationService'
import { ResponseService } from '@/services/ResponseService'
import { Hunt } from '@/models/Hunt'
import { ScoreUtility } from '@/utilities/ScoreUtility'

export class HuntService {
    static readonly huntFetchError = new Error("No Hunts Found")

    static async fetchHunts(userId: string, page: number): Promise<Hunt[]> {
        const numberPerPage = 5
        const startItem = page * numberPerPage
        const endItem = ((page + 1) * numberPerPage) - 1

        const participations = await ParticipationService.fetchParticipatingHuntIdsFor(userId)

        const currentDate = new Date().toISOString()

        // Show open hunts or those that the user has participated in.
        let query = supabase
            .from('hunt')
            .select('*')
            .or(`id.in.(${participations}), and(start_date.lte.${currentDate}, end_date.gte.${currentDate})`)
            .range(startItem, endItem)
            .order('start_date', { ascending: false })

        if (import.meta.env.VITE_SHOW_HIDDEN == null) { query = query.eq('hidden', false) }

        const { data: hunts, error: error } = await query

        if (!hunts || error) throw this.huntFetchError

        const huntIds = hunts.flatMap((hunt) => { return hunt.id })

        // Find all responses so that the total score for each hunt can be calculated.
        const scores = await ResponseService.fetchScoresFor(huntIds, userId)

        let huntValues = hunts.map(async (hunt) => {
            const huntScores = scores.filter((score) => {
                if (score.huntId == hunt.id) return score
            })

            const hasParticipation = participations.includes(hunt.id)

            if (huntScores) {
                const score = huntScores.reduce((sum, huntScoreData) => sum += huntScoreData.score, 0)

                let tier = await ScoreUtility.scoreToTier(score, hunt)

                return new Hunt(hunt.id, hunt.start_date, hunt.end_date, hunt.hidden, score, hunt.max_score, hasParticipation, tier)
            }

            return new Hunt(hunt.id, hunt.start_date, hunt.end_date, hunt.hidden, 0, 0, hasParticipation)
        })

        return Promise.all(huntValues)
    }
}