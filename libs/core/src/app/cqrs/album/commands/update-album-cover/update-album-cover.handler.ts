import { CommandHandler } from '@core/app/types';
import { UpdateAlbumCoverCommand } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.command';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

export class UpdateAlbumCoverHandler implements CommandHandler<UpdateAlbumCoverCommand> {
  constructor(private readonly _service: AlbumUpdateService) {}

  async execute({ id, payload }: UpdateAlbumCoverCommand) {
    return await this._service.updateCover(id, payload);
  }
}
