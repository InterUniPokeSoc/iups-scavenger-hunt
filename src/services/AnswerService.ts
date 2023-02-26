import { supabase } from '@/services/Supabase'
import { Answer } from '@/models/Answer'

export class AnswerService {

    static readonly answerFetchError = new Error("No Answer Found")

    static async fetchAnswers(hintId: number): Promise<Answer[]> {
        console.log("HINTID: "+hintId)

        const { data: answers, error: error } = await supabase
            .from('answer')
            .select('*')
            .eq('hint_id', hintId)

        console.log("ANSWERS FOUND: "+JSON.stringify(answers))

        if (answers == null) return []

        return answers.map((answer) => {
            return new Answer(answer.id, answer.hint_id, answer.answer, answer.percentage_value)
        })
    }
}