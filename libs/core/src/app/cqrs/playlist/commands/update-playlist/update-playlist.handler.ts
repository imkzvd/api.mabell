import { CommandHandler } from '@core/app/types';
import { UpdatePlaylistCommand } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.command';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

export class UpdatePlaylistHandler implements CommandHandler<UpdatePlaylistCommand> {
  constructor(private readonly _service: PlaylistUpdateService) {}

  async execute({ id, payload }: UpdatePlaylistCommand) {
    return await this._service.update(id, payload);
  }
}
