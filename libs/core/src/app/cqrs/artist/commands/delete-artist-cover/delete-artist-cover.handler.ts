import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistCoverCommand } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.command';

export class DeleteArtistCoverHandler implements CommandHandler<DeleteArtistCoverCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id }: DeleteArtistCoverCommand) {
    return await this._artistService.deleteArtistCover(id);
  }
}
