import { CommandHandler } from '@core/app/types';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { DeletePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.command';

export class DeletePlaylistCoverHandler implements CommandHandler<DeletePlaylistCoverCommand> {
  constructor(private readonly _playlistService: PlaylistService) {}

  async execute({ id }: DeletePlaylistCoverCommand) {
    return await this._playlistService.deletePlaylistCover(id);
  }
}
