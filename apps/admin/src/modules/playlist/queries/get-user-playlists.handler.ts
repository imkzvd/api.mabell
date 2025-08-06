import { QueryHandler } from '@nestjs/cqrs';
import { GetUserPlaylistsQuery } from '@core/app/cqrs/playlist/queries/get-user-playlists/get-user-playlists.query';
import { GetUserPlaylistsHandler as CoreGetUserPlaylistsHandler } from '@core/app/cqrs/playlist/queries/get-user-playlists/get-user-playlists.handler';
import { UserVerifyService } from '@core/app/components/user/services/user-verify.service';
import { PlaylistService } from '@core/app/components/playlist/services/playlist.service';

@QueryHandler(GetUserPlaylistsQuery)
export class GetUserPlaylistsHandler extends CoreGetUserPlaylistsHandler {
  constructor(userVerifyService: UserVerifyService, playlistService: PlaylistService) {
    super(userVerifyService, playlistService);
  }
}
