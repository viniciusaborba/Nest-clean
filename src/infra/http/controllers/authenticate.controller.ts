import { ZodValidationPipe } from "@/infra/pipes/zod-validation-pipe";
import {
  Body,
  Controller,
  Post,
  UsePipes,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { WrongCredentialsError } from "@/domain/forum/application/use-cases/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type authenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
@Public()
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: authenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    };
  }
}
