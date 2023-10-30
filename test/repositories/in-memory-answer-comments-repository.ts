import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answers-comments-repostiory'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository implements AnswersCommentsRepository {
  public items: AnswerComment[] = []
  
  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }
  
  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }
  
  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)

    this.items.splice(itemIndex, 1)
  }
  
  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}