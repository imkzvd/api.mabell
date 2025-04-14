import { Command } from '@nestjs/cqrs';

export class DeleteTrackCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
