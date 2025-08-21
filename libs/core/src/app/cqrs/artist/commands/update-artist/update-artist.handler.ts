import { CommandHandler } from '../../../../types';
import { UpdateArtistCommand } from './update-artist.command';
import { ArtistUpdateService } from '../../../../components/artist';

export class UpdateArtistHandler implements CommandHandler<UpdateArtistCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id, payload }: UpdateArtistCommand) {
    await this._service.updateById(id, payload);
  }
}
