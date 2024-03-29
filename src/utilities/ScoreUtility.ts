import { ResponseService } from "@/services/ResponseService"
import { Hunt } from '@/models/Hunt'

export class ScoreUtility {

    static readonly scoreError = new Error("Unable to Process Score")

    static getPercentage(score: number, maxScore: number): number {
        return Math.floor(score / maxScore * 100)
    }

    static scoreToColour(score: number, maxScore: number): string {
        let percentage = this.getPercentage(score, maxScore)

        if (percentage >= 100) {
            return 'teal'
        } else if (percentage >= 80) {
            return 'cyan'
        } else if (percentage >= 60) {
            return 'indigo'
        } else if (percentage >= 40) {
            return 'deep-orange'
        } else {
            return 'pink'
        }
    }

    static async scoreToTier(userScore: number, hunt: Hunt): Promise<string> {
        if (userScore == 0) return 'F'
        if (userScore == hunt.maxScore) return 'S'

        console.log(`userscore(${userScore}) hunt.maxScore(${hunt.maxScore}) are EQUAL(${userScore == hunt.maxScore}))`)

        let scores = await ResponseService.fetchAllScoresFor(hunt.id, true)
        
        if (scores == null) throw this.scoreError

        let orderedScores = [...new Set(scores)].sort((a,b) => a-b)

        if (orderedScores.length == 1) return 'S'

        let indexOfUserScore = orderedScores.indexOf(userScore)

        let percentage = this.getPercentage(indexOfUserScore+1, orderedScores.length)

        if (percentage >= 100) {
            return 'A'
        } else if (percentage >= 70) {
            return 'B'
        } else if (percentage >= 50) {
            return 'C'
        } else if (percentage >= 40) {
            return 'D'
        } else if (percentage >= 30) {
            return 'E'
        } else {
            return 'F'
        }
    }

    static tierToColor(tier: string): string {
        switch(tier) {
            case 'S': { 
                return 'teal'
            }
            case 'A+': { 
                return 'cyan'
            }
            case 'A': { 
                return 'cyan'
            }
            case 'B': { 
                return 'indigo'
            }
            case 'C': { 
                return 'deep-purple'
            }
            case 'D': { 
                return 'deep-orange'
            }
            default: { 
                return 'pink'
            }
        }
    }
}