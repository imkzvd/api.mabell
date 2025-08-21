import { CommandHandler } from '../../../../types';
import { DeleteAlbumCommand } from './delete-album.command';
import { AlbumDeleteService } from '../../../../components/album';

export class DeleteAlbumHandler implements CommandHandler<DeleteAlbumCommand> {
  constructor(private readonly _service: AlbumDeleteService) {}

  async execute({ id }: DeleteAlbumCommand) {
    await this._service.deleteById(id);
  }
}
