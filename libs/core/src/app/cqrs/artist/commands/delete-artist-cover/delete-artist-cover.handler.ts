import { CommandHandler } from '@core/app/types';
import { DeleteArtistCoverCommand } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.command';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

export class DeleteArtistCoverHandler implements CommandHandler<DeleteArtistCoverCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id }: DeleteArtistCoverCommand) {
    return await this._service.deleteCover(id);
  }
}
