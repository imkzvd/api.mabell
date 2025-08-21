import { CommandHandler } from '../../../../types';
import { DeleteArtistCoverCommand } from './delete-artist-cover.command';
import { ArtistUpdateService } from '../../../../components/artist';

export class DeleteArtistCoverHandler implements CommandHandler<DeleteArtistCoverCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id }: DeleteArtistCoverCommand) {
    await this._service.deleteCoverById(id);
  }
}
