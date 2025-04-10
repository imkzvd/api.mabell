import { Command } from '@nestjs/cqrs';

export class UpdateAlbumArtistsByIdCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly artists: string[],
  ) {
    super();
  }
}
