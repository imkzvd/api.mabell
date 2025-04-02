import { Command } from '@nestjs/cqrs';

export class DeleteArtistCoverByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
