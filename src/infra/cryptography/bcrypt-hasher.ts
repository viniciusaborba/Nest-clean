import { hash, compare } from "bcryptjs";
import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  hash(plain: string) {
    return hash(plain, 8);
  }

  compare(plain: string, hash: string) {
    return compare(plain, hash);
  }
}
