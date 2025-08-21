import { CommandHandler } from '../../../../types';
import { UpdatePlaylistCommand } from './update-playlist.command';
import { PlaylistUpdateService } from '../../../../components/playlist';

export class UpdatePlaylistHandler implements CommandHandler<UpdatePlaylistCommand> {
  constructor(private readonly _service: PlaylistUpdateService) {}

  async execute({ id, payload }: UpdatePlaylistCommand) {
    await this._service.updateById(id, payload);
  }
}
