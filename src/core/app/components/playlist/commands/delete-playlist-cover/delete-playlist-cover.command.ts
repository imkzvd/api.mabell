import { Command } from '@nestjs/cqrs';

export class DeletePlaylistCoverCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
