import { CommandHandler } from '../../../../types';
import { UpdatePlaylistCoverCommand } from './update-playlist-cover.command';
import { PlaylistUpdateService } from '../../../../components/playlist';

export class UpdatePlaylistCoverHandler implements CommandHandler<UpdatePlaylistCoverCommand> {
  constructor(private readonly _service: PlaylistUpdateService) {}

  async execute({ id, payload }: UpdatePlaylistCoverCommand) {
    await this._service.updateCoverById(id, payload);
  }
}
