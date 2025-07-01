import { CommandHandler } from '@core/app/types';
import { AlbumService } from '@core/app/components/album/album.service';
import { DeleteAlbumCommand } from '@core/app/cqrs/album/commands/delete-album/delete-album.command';

export class DeleteAlbumHandler implements CommandHandler<DeleteAlbumCommand> {
  constructor(private readonly _albumService: AlbumService) {}

  async execute({ id }: DeleteAlbumCommand) {
    return await this._albumService.deleteAlbum(id);
  }
}
