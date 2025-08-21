import { CommandHandler } from '../../../../types';
import { DeleteArtistCommand } from './delete-artist.command';
import { ArtistDeleteService } from '../../../../components/artist';

export class DeleteArtistHandler implements CommandHandler<DeleteArtistCommand> {
  constructor(private readonly _service: ArtistDeleteService) {}

  async execute({ id }: DeleteArtistCommand) {
    await this._service.deleteById(id);
  }
}
