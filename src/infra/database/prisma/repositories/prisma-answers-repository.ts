import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAnswerMapper } from "../mappers/prisma-answer-mapper";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private AnswerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      }
    })

    if (!answer) {
      return null
    }

   return PrismaAnswerMapper.toDomain(answer) 
  }
  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ) {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      take: 20,
      skip: (page - 1) * 20
    })

   return answers.map(PrismaAnswerMapper.toDomain)
  }
  async create(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data,
    })

    await this.AnswerAttachmentsRepository.createMany(
      answer.attachments.getItems()
    );
  }
  async save(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: data.id,
        },
        data,
      }),
      
      this.AnswerAttachmentsRepository.createMany(
        answer.attachments.getNewItems()
      ),

      this.AnswerAttachmentsRepository.deleteMany(
        answer.attachments.getRemovedItems()
      ),
    ]);
  }
  async delete(answer: Answer) {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }
}
