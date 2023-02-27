import { supabase } from '@/services/Supabase'
import { Response } from '@/models/Response'
import { ParticipationService } from './ParticipationService'
import { Hint } from '@/models/Hint'

export class ResponseService {

    static readonly responseFetchError = new Error("No Response Found")
    static readonly responseWriteError = new Error("Response Write Error")

    static async fetchResponseFor(hintId: number, userId: string): Promise<Response | null> {
        const { data: results, error: error } = await supabase
            .from('response')
            .select('id, participation!inner(user_id), answer!inner(answer, percentage_value, hint!inner(id, max_value))')
            .eq('answer.hint.id', hintId)
            .eq('participation.user_id', userId)

        if (error || results == null || results[0] == null) return null

        let result: any = results[0]

        let score = Math.floor((result.answer.percentage_value / 100) * result.answer.hint.max_value)

        return new Response(result.id, result.answer.hint.id, result.participation.id, score, result.answer.answer)
    }

    static async fetchScoresFor(huntIds: number[], userId: string): Promise<any[]> {
        const { data: results, error: error } = await supabase
            .from('response')
            .select('participation!inner(user_id), answer!inner(percentage_value, hint!inner(max_value, hunt!inner(id)))')
            .eq('participation.user_id', userId)
            .in('answer.hint.hunt.id', huntIds)

        if (results == null) return []

        return results.map((result: any) => {
            return {
                huntId: result.answer.hint.hunt.id,
                score: Math.floor((result.answer.percentage_value / 100) * result.answer.hint.max_value)
            }
        })
    }

    static async fetchHintScoresFor(huntId: number, userId: string): Promise<any[]> {
        const { data: results, error: error } = await supabase
            .from('response')
            .select('participation!inner(user_id), answer!inner(percentage_value, hint!inner(id, max_value, hunt!inner(id)))')
            .eq('participation.user_id', userId)
            .eq('answer.hint.hunt.id', huntId)

        if (error) throw this.responseFetchError

        if (results == null) return []

        return results.map((result: any) => {
            return {
                hintId: result.answer.hint.id,
                score: Math.floor((result.answer.percentage_value / 100) * result.answer.hint.max_value)
            }
        })
    }

    static async writeResponse(hint: Hint, answerId: number, userId: string): Promise<any> {
        let participationId = await ParticipationService.fetchParticipationIdFor(hint.huntId, userId)

        if (participationId == null) throw this.responseWriteError

        const { data: result, error: error } = await supabase
            .from('response')
            .insert([{ participation_id: participationId, answer_id: answerId }])

        if (error) throw this.responseWriteError
    }
}