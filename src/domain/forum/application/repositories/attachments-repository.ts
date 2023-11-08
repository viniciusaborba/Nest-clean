import { Attachment } from '../../enterprise/entities/attachment';
import { Student } from '../../enterprise/entities/student'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}