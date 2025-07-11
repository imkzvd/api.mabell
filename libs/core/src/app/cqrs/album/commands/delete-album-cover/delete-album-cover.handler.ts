import { CommandHandler } from '@core/app/types';
import { DeleteAlbumCoverCommand } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.command';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

export class DeleteAlbumCoverHandler implements CommandHandler<DeleteAlbumCoverCommand> {
  constructor(private readonly _service: AlbumUpdateService) {}

  async execute({ id }: DeleteAlbumCoverCommand) {
    return await this._service.deleteCover(id);
  }
}
