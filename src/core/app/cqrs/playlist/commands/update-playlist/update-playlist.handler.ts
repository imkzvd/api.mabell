import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePlaylistCommand } from './update-playlist.command';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(UpdatePlaylistCommand)
export class UpdatePlaylistHandler implements ICommandHandler<UpdatePlaylistCommand> {
  constructor(@Inject(PlaylistService) private readonly _playlistService: PlaylistService) {}

  async execute({ id, payload }: UpdatePlaylistCommand) {
    return await this._playlistService.updatePlaylist(id, payload);
  }
}
