import { supabase } from '@/services/Supabase'
import { Answer } from '@/models/Answer'

export class AnswerService {

    static readonly answerFetchError = new Error("No Answer Found")

    static async fetchAnswers(hintId: number): Promise<Answer[]> {
        const { data: answers, error: error } = await supabase
            .from('answer')
            .select('*')
            .eq('hint_id', hintId)

        if (answers == null) return []

        return answers.map((answer) => {
            return new Answer(answer.id, answer.hint_id, answer.answer, answer.percentage_value)
        })
    }
}