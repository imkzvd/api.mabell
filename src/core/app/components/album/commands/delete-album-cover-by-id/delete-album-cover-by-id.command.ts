import { Command } from '@nestjs/cqrs';

export class DeleteAlbumCoverByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
