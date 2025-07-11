import { CommandHandler } from '@core/app/types';
import { UpdateAlbumCommand } from '@core/app/cqrs/album/commands/update-album/update-album.command';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

export class UpdateAlbumHandler implements CommandHandler<UpdateAlbumCommand> {
  constructor(private readonly _service: AlbumUpdateService) {}

  async execute({ id, payload }: UpdateAlbumCommand) {
    return await this._service.update(id, payload);
  }
}
