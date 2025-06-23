import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePlaylistCoverCommand } from './delete-playlist-cover.command';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(DeletePlaylistCoverCommand)
export class DeletePlaylistCoverHandler implements ICommandHandler<DeletePlaylistCoverCommand> {
  constructor(@Inject(PlaylistService) private readonly _playlistService: PlaylistService) {}

  async execute({ id }: DeletePlaylistCoverCommand) {
    return await this._playlistService.deletePlaylistCover(id);
  }
}
