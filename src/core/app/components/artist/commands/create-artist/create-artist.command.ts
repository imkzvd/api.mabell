import { Command } from '@nestjs/cqrs';

export class CreateArtistCommand extends Command<{ id: string }> {
  constructor() {
    super();
  }
}
