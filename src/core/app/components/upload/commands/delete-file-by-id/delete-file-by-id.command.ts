import { Command } from '@nestjs/cqrs';

export class DeleteFileByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
