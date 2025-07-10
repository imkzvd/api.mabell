import { CommandHandler } from '@core/app/types';
import { UpdateArtistCommand } from '@core/app/cqrs/artist/commands/update-artist/update-artist.command';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

export class UpdateArtistHandler implements CommandHandler<UpdateArtistCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id, payload }: UpdateArtistCommand) {
    return await this._service.update(id, payload);
  }
}
