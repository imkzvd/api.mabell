import { Command } from '@nestjs/cqrs';

export class DeleteArtistCoverCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
