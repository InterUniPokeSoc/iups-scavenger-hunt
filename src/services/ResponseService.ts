import { supabase } from '@/services/Supabase'
import { Response } from '@/models/Response'

export class ResponseService {

    static readonly responseFetchError = new Error("No Response Found")

    static async fetchScoresFor(huntIds: number[], userId: string): Promise<any[]> {
        const { data: results, error: error } = await supabase
            .from('response')
            .select('participation(user_id), answer(percentage_value, hint(max_value, hunt(id)))')
            .eq('participation.user_id', userId)
            .in('answer.hint.hunt.id', huntIds)

        if (results == null) return []

        return results.map((result) => {
            return {
                huntId: result.answer.hint.hunt.id,
                score: Math.floor((result.answer.percentage_value / 100) * result.answer.hint.max_value)
            }
        })
    }
}