import { CommandHandler } from '../../../../types';
import { UpdateArtistCoverCommand } from './update-artist-cover.command';
import { ArtistUpdateService } from '../../../../components/artist';

export class UpdateArtistCoverHandler implements CommandHandler<UpdateArtistCoverCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id, payload }: UpdateArtistCoverCommand) {
    await this._service.updateCoverById(id, payload);
  }
}
