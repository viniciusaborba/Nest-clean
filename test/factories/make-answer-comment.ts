import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment, AnswerCommentProps } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment-mapper'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create({
    answerId: new UniqueEntityID(),
    authorId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override,
  },
    id
  )

  return answerComment
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(data: Partial<AnswerCommentProps> = {}): Promise<AnswerComment> {
    const question = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(question)
    })

    return question
  }
}
