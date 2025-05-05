import { Command } from '@nestjs/cqrs';

export class DeleteArtistCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
