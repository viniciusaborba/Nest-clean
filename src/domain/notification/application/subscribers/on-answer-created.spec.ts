import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"
import { 
  SendNotificationUseCase, 
  SendNotificationUseCaseRequest, 
  SendNotificationUseCaseResponse 
} from "../use-cases/send-notification"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { makeQuestion } from "test/factories/make-question"
import { vi, SpyInstance } from "vitest"
import { waitFor } from "test/utils/wait-for"

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('On answer created', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionsAttachmentsRepository)
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  //TODO: fix spy error
  it.skip('should be able to send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})