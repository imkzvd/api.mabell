import { CommandHandler } from '@core/app/types';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UpdatePlaylistCommand } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.command';

export class UpdatePlaylistHandler implements CommandHandler<UpdatePlaylistCommand> {
  constructor(private readonly _playlistService: PlaylistService) {}

  async execute({ id, payload }: UpdatePlaylistCommand) {
    return await this._playlistService.updatePlaylist(id, payload);
  }
}
