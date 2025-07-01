import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistCommand } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.command';

export class DeleteArtistHandler implements CommandHandler<DeleteArtistCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id }: DeleteArtistCommand) {
    return await this._artistService.deleteArtist(id);
  }
}
