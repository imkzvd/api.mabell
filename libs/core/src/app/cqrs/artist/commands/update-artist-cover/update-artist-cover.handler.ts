import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistCoverCommand } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.command';

export class UpdateArtistCoverHandler implements CommandHandler<UpdateArtistCoverCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id, payload }: UpdateArtistCoverCommand) {
    return await this._artistService.updateArtistCover(id, payload);
  }
}
