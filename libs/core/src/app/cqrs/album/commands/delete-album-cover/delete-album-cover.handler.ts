import { CommandHandler } from '../../../../types';
import { DeleteAlbumCoverCommand } from './delete-album-cover.command';
import { AlbumUpdateService } from '../../../../components/album';

export class DeleteAlbumCoverHandler implements CommandHandler<DeleteAlbumCoverCommand> {
  constructor(private readonly _service: AlbumUpdateService) {}

  async execute({ id }: DeleteAlbumCoverCommand) {
    await this._service.deleteCoverById(id);
  }
}
