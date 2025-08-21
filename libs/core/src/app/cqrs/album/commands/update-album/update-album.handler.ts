import { CommandHandler } from '../../../../types';
import { UpdateAlbumCommand } from './update-album.command';
import { AlbumUpdateService } from '../../../../components/album';

export class UpdateAlbumHandler implements CommandHandler<UpdateAlbumCommand> {
  constructor(private readonly _service: AlbumUpdateService) {}

  async execute({ id, payload }: UpdateAlbumCommand) {
    await this._service.updateById(id, payload);
  }
}
