import { Command } from '@nestjs/cqrs';

export class DeleteAllFilesCommand extends Command<void> {
  constructor() {
    super();
  }
}
