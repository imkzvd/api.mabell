import { CommandHandler } from '../../../../types';
import { UpdateAlbumCoverCommand } from './update-album-cover.command';
import { AlbumUpdateService } from '../../../../components/album';

export class UpdateAlbumCoverHandler implements CommandHandler<UpdateAlbumCoverCommand> {
  constructor(private readonly _service: AlbumUpdateService) {}

  async execute({ id, payload }: UpdateAlbumCoverCommand) {
    await this._service.updateCoverById(id, payload);
  }
}
