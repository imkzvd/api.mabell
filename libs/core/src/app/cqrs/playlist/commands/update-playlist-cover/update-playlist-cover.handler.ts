import { CommandHandler } from '@core/app/types';
import { UpdatePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.command';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

export class UpdatePlaylistCoverHandler implements CommandHandler<UpdatePlaylistCoverCommand> {
  constructor(private readonly _service: PlaylistUpdateService) {}

  async execute({ id, payload }: UpdatePlaylistCoverCommand) {
    return await this._service.updateCover(id, payload);
  }
}
