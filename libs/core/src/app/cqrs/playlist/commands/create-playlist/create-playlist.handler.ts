import { CommandHandler } from '../../../../types';
import { CreatePlaylistCommand } from './create-playlist.command';
import { UserVerifyService } from '../../../../components/user';
import { PlaylistCreateService } from '../../../../components/playlist';
import { NotFoundException } from '../../../../../shared/exceptions';

export class CreatePlaylistHandler implements CommandHandler<CreatePlaylistCommand> {
  constructor(
    private readonly _userVerifyService: UserVerifyService,
    private readonly _playlistCreateService: PlaylistCreateService,
  ) {}

  async execute({ userId }: CreatePlaylistCommand) {
    const verifiedUserId = await this._userVerifyService.verifyById(userId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    const id = await this._playlistCreateService.create({ userId: verifiedUserId });

    return { id };
  }
}
