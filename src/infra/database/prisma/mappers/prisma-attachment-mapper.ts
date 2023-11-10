import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Prisma } from "@prisma/client";

export class PrismaAttachmentMapper {
  static toPrisma(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
