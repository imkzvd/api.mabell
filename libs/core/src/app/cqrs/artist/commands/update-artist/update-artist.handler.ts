import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistCommand } from '@core/app/cqrs/artist/commands/update-artist/update-artist.command';

export class UpdateArtistHandler implements CommandHandler<UpdateArtistCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id, payload }: UpdateArtistCommand) {
    return await this._artistService.updateArtist(id, payload);
  }
}
