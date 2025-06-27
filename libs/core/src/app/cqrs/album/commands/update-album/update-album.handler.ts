import { CommandHandler } from '@core/app/types';
import { UpdateAlbumCommand } from '@core/app/cqrs/album/commands/update-album/update-album.command';
import { AlbumService } from '@core/app/components/album/album.service';

export class UpdateAlbumHandler implements CommandHandler<UpdateAlbumCommand> {
  constructor(private readonly _albumService: AlbumService) {}

  async execute({ id, payload }: UpdateAlbumCommand) {
    return await this._albumService.updateAlbum(id, payload);
  }
}
