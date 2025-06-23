import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePlaylistCoverCommand } from './update-playlist-cover.command';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler implements ICommandHandler<UpdatePlaylistCoverCommand> {
  constructor(@Inject(PlaylistService) private readonly _playlistService: PlaylistService) {}

  async execute({ id, payload }: UpdatePlaylistCoverCommand) {
    return await this._playlistService.updatePlaylistCover(id, payload);
  }
}
