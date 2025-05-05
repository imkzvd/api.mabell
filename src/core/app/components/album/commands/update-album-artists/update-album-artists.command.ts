import { Command } from '@nestjs/cqrs';

export class UpdateAlbumArtistsCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly artists: string[],
  ) {
    super();
  }
}
