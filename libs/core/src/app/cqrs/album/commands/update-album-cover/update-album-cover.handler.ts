import { CommandHandler } from '@core/app/types';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumCoverCommand } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.command';

export class UpdateAlbumCoverHandler implements CommandHandler<UpdateAlbumCoverCommand> {
  constructor(private readonly _albumService: AlbumService) {}

  async execute({ id, payload }: UpdateAlbumCoverCommand) {
    return await this._albumService.updateAlbumCover(id, payload);
  }
}
