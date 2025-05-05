import { Command } from '@nestjs/cqrs';

export class DeleteAlbumCoverCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
