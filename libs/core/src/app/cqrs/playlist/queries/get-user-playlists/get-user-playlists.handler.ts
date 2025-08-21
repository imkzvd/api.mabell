import { QueryHandler } from '../../../../types';
import { GetUserPlaylistsQuery } from './get-user-playlists.query';
import { UserVerifyService } from '../../../../components/user';
import { PlaylistService } from '../../../../components/playlist';
import { NotFoundException } from '../../../../../shared/exceptions';

export class GetUserPlaylistsHandler implements QueryHandler<GetUserPlaylistsQuery> {
  constructor(
    private readonly _userVerifyService: UserVerifyService,
    private readonly _playlistService: PlaylistService,
  ) {}

  async execute({ userId, options }: GetUserPlaylistsQuery) {
    const verifiedUserId = await this._userVerifyService.verifyById(userId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    return this._playlistService.findByUserId(userId, options);
  }
}
