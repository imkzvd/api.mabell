import { Command } from '@nestjs/cqrs';

export class DeleteArtistByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
