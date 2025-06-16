import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPlaylistQuery } from './get-playlist.query';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@QueryHandler(GetPlaylistQuery)
export class GetPlaylistHandler implements IQueryHandler<GetPlaylistQuery> {
  constructor(@Inject(PlaylistService) private readonly _playlistService: PlaylistService) {}

  async execute({ id, isPublic }: GetPlaylistQuery) {
    return await this._playlistService.getPlaylist(id, {
      isPublic,
    });
  }
}
