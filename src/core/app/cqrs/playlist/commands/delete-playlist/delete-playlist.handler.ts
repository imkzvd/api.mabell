import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePlaylistCommand } from './delete-playlist.command';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(DeletePlaylistCommand)
export class DeletePlaylistHandler implements ICommandHandler<DeletePlaylistCommand> {
  constructor(@Inject(PlaylistService) private readonly _playlistService: PlaylistService) {}

  async execute({ id }: DeletePlaylistCommand) {
    return await this._playlistService.deletePlaylist(id);
  }
}
