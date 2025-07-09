import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { CreatePlaylistCommand } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';
import { UserVerificationService } from '@core/app/components/user/services/user-verification.service';

export class CreatePlaylistHandler implements CommandHandler<CreatePlaylistCommand> {
  constructor(
    private readonly _userVerificationService: UserVerificationService,
    private readonly _playlistService: PlaylistService,
  ) {}

  async execute({ ownerId }: CreatePlaylistCommand) {
    const verifiedUserId = await this._userVerificationService.verify(ownerId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    return await this._playlistService.createPlaylist({ ownerId: verifiedUserId });
  }
}
