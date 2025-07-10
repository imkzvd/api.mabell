import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { CreatePlaylistCommand } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';
import { UserVerifyService } from '@core/app/components/user/services/user-verify.service';
import { PlaylistCreateService } from '@core/app/components/playlist/services/playlist-create.service';

export class CreatePlaylistHandler implements CommandHandler<CreatePlaylistCommand> {
  constructor(
    private readonly _userVerifyService: UserVerifyService,
    private readonly _playlistCreateService: PlaylistCreateService,
  ) {}

  async execute({ ownerId }: CreatePlaylistCommand) {
    const verifiedUserId = await this._userVerifyService.verify(ownerId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    return await this._playlistCreateService.create({ ownerId: verifiedUserId });
  }
}
