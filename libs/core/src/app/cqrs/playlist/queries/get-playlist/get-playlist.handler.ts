import { QueryHandler } from '@core/app/types';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { GetPlaylistQuery } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.query';

export class GetPlaylistHandler implements QueryHandler<GetPlaylistQuery> {
  constructor(private readonly _playlistService: PlaylistService) {}

  async execute({ id, isPublic }: GetPlaylistQuery) {
    return await this._playlistService.getPlaylist(id, {
      isPublic,
    });
  }
}
