import { CommandHandler } from '@core/app/types';
import { DeleteArtistCommand } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.command';
import { ArtistDeleteService } from '@core/app/components/artist/services/artist-delete.service';

export class DeleteArtistHandler implements CommandHandler<DeleteArtistCommand> {
  constructor(private readonly _service: ArtistDeleteService) {}

  async execute({ id }: DeleteArtistCommand) {
    return await this._service.delete(id);
  }
}
