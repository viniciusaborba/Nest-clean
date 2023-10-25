import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string()
// })

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
// @UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class AuthenticateController {
  constructor(
    private jwt: JwtService
  ) {}
  
  @Post()
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id '})

    return token
  }
}