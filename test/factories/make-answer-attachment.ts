import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment, AnswerAttachmentProps } from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachment.create({
    attachmentId: new UniqueEntityID(),
    answerId: new UniqueEntityID(),
    ...override,
  },
    id,
  )

  return answerAttachment
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachment(data: Partial<AnswerAttachmentProps> = {}): Promise<AnswerAttachment> {
    const questionAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: {
        answerId: questionAttachment.answerId.toString(),
      }
    })

    return questionAttachment
  }
}
