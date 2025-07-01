import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UserService } from '@core/app/components/user/user.service';
import { CreatePlaylistCommand } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';

export class CreatePlaylistHandler implements CommandHandler<CreatePlaylistCommand> {
  constructor(
    private readonly _userService: UserService,
    private readonly _playlistService: PlaylistService,
  ) {}

  async execute({ ownerId }: CreatePlaylistCommand) {
    const verifiedUserId = await this._userService.verifyUserId(ownerId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    return await this._playlistService.createPlaylist({ ownerId: verifiedUserId });
  }
}
