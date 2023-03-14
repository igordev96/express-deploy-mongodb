import { randomUUID } from "node:crypto";

export class UserDTO {
  id: string;
  email: string;
  hash: string;

  constructor(email: string, hash: string) {
    this.id = randomUUID();
    this.email = email;
    this.hash = hash;
  }
}
