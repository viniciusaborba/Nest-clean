import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAnswerCommentMapper } from "../mappers/prisma-answer-comment-mapper";

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      }
    })

    if (!answerComment) {
      return null
    }

   return PrismaAnswerCommentMapper.toDomain(answerComment) 
  }
  
  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ) {
    const answers = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      take: 20,
      skip: (page - 1) * 20
    })

   return answers.map(PrismaAnswerCommentMapper.toDomain)
  }
  
  async create(answerComment: AnswerComment) {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)

    await this.prisma.comment.create({
      data,
    })
  }
  
  async delete(answerComment: AnswerComment) {
    await this.prisma.comment.delete({
      where: {
        id: answerComment.id.toString(),
      },
    })
  }
}
