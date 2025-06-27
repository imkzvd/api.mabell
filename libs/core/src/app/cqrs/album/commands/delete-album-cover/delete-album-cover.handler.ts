import { CommandHandler } from '@core/app/types';
import { AlbumService } from '@core/app/components/album/album.service';
import { DeleteAlbumCoverCommand } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.command';

export class DeleteAlbumCoverHandler implements CommandHandler<DeleteAlbumCoverCommand> {
  constructor(private readonly _albumService: AlbumService) {}

  async execute({ id }: DeleteAlbumCoverCommand) {
    return await this._albumService.deleteAlbumCover(id);
  }
}
