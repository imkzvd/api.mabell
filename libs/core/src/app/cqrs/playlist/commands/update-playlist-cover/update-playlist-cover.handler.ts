import { CommandHandler } from '@core/app/types';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UpdatePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.command';

export class UpdatePlaylistCoverHandler implements CommandHandler<UpdatePlaylistCoverCommand> {
  constructor(private readonly _playlistService: PlaylistService) {}

  async execute({ id, payload }: UpdatePlaylistCoverCommand) {
    return await this._playlistService.updatePlaylistCover(id, payload);
  }
}
