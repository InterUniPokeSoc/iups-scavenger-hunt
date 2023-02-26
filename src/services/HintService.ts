import { supabase } from '@/services/Supabase'

import { ResponseService } from '@/services/ResponseService'
import { ParticipationService } from '@/services/ParticipationService'
import { AnswerService } from '@/services/AnswerService'
import { Hint } from '@/models/Hint'

export class HintService {

    static readonly hintFetchError = new Error("No Hints Found")

    static readonly unauthorised = new Error("Unauthorised")

    static async fetchHintsFor(huntId: number, userId: string): Promise<Hint[]> {
        const participatingHuntIds = await ParticipationService.fetchParticipatingHuntIdsFor(userId)

        if (!participatingHuntIds.includes(huntId)) throw this.unauthorised

        const hintScores = await ResponseService.fetchHintScoresFor(huntId, userId)

        const { data: hints, error: error } = await supabase
            .from('hint')
            .select('*')
            .eq('hunt_id', huntId)
            .order('order', { ascending: true })

        if (hints == null) return []

        return hints.map((hint) => {
            const score = hintScores.filter((hintScore) => {
                if (hintScore.hintId == hint.id) return hintScore
            })[0]

            return new Hint(hint.id, hint.hunt_id, hint.question, hint.image_url, hint.order, hint.max_value, score?.score, null)
        })
    }

    static async fetchHint(hintId: number): Promise<Hint> {
        const answers = await AnswerService.fetchAnswers(hintId)

        if (answers == null) throw this.hintFetchError

        const { data: hints, error: error } = await supabase
            .from('hint')
            .select('*')
            .eq('id', hintId)

        if (hints == null || !hints[0] || error) throw this.hintFetchError

        const hint = hints[0]

        return new Hint(hint.id, hint.hunt_id, hint.question, hint.image_url, hint.order, hint.max_value, null, answers)
    }
}