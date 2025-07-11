import { CommandHandler } from '@core/app/types';
import { DeleteAlbumCommand } from '@core/app/cqrs/album/commands/delete-album/delete-album.command';
import { AlbumDeleteService } from '@core/app/components/album/services/album-delete.service';

export class DeleteAlbumHandler implements CommandHandler<DeleteAlbumCommand> {
  constructor(private readonly _service: AlbumDeleteService) {}

  async execute({ id }: DeleteAlbumCommand) {
    return await this._service.delete(id);
  }
}
