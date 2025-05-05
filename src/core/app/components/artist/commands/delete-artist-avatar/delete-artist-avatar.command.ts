import { Command } from '@nestjs/cqrs';

export class DeleteArtistAvatarCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
