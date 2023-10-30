import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Either, right } from '@/core/either'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, 
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor (
    private questionsRepository: QuestionRepository,
  ) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}