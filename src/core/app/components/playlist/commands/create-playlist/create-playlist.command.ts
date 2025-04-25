import { Command } from '@nestjs/cqrs';

export class CreatePlaylistCommand extends Command<{ id: string }> {
  constructor(public readonly ownerId: string) {
    super();
  }
}
