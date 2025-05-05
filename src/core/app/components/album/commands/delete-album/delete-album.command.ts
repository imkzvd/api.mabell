import { Command } from '@nestjs/cqrs';

export class DeleteAlbumCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
