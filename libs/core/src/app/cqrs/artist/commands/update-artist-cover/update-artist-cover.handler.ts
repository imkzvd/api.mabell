import { CommandHandler } from '@core/app/types';
import { UpdateArtistCoverCommand } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.command';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

export class UpdateArtistCoverHandler implements CommandHandler<UpdateArtistCoverCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id, payload }: UpdateArtistCoverCommand) {
    return await this._service.updateCover(id, payload);
  }
}
