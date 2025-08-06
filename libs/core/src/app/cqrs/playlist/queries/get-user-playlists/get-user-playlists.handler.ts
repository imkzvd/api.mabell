import { QueryHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { GetUserPlaylistsQuery } from '@core/app/cqrs/playlist/queries/get-user-playlists/get-user-playlists.query';
import { PlaylistService } from '@core/app/components/playlist/services/playlist.service';
import { UserVerifyService } from '@core/app/components/user/services/user-verify.service';

export class GetUserPlaylistsHandler implements QueryHandler<GetUserPlaylistsQuery> {
  constructor(
    private readonly _userVerifyService: UserVerifyService,
    private readonly _playlistService: PlaylistService,
  ) {}

  async execute({ userId, options }: GetUserPlaylistsQuery) {
    const verifiedUserId = await this._userVerifyService.verify(userId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    return await this._playlistService.findByUserId(userId, options);
  }
}
