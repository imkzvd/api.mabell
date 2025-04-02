import { Command } from '@nestjs/cqrs';

export class DeleteArtistAvatarByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
