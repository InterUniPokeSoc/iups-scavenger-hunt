import { supabase } from '@/services/Supabase'
import { Hunt } from '@/models/Hunt'

export class HuntService {

    static readonly huntFetchError = new Error("No Hunts Found")

    static async getHunts(): Promise<Hunt[]> {
        return this.fetchHunts()
        .then((hunts) => {
            const result: any[] = hunts.map((hunt) => {
                new Hunt(hunt.id, hunt.start_date, hunt.end_date, hunt.hidden)
            })

            return result
        })
        .catch(() => {
            throw this.huntFetchError
        })
    }

    private static async fetchHunts(): Promise<any[]> {
        const { data: hunts, error: error } = await supabase
            .from('hunt')
            .select('*')
            .eq('hidden', false)

        if (hunts == null) { throw this.huntFetchError }

        return hunts
    }
}