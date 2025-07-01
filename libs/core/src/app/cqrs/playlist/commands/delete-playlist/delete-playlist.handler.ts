import { CommandHandler } from '@core/app/types';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { DeletePlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.command';

export class DeletePlaylistHandler implements CommandHandler<DeletePlaylistCommand> {
  constructor(private readonly _playlistService: PlaylistService) {}

  async execute({ id }: DeletePlaylistCommand) {
    return await this._playlistService.deletePlaylist(id);
  }
}
