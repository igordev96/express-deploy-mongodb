import { randomUUID } from "node:crypto";

export class TaskDTO {
  id: string;
  title: string;
  createdBy: string;

  constructor(title: string, createdBy: string) {
    this.title = title;
    this.createdBy = createdBy;
    this.id = randomUUID();
  }
}
