import { Command } from '../../../../types';

export class UpdateAlbumArtistsCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly artistIds: string[],
  ) {
    super();
  }
}
