import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPlaylistQuery } from './get-playlist.query';
import PlaylistMapper from '../dtos/playlist.mapper';
import {
  PLAYLIST_READ_REPOSITORY_DI_TOKEN,
  PlaylistReadRepository,
} from '../../../../../domain/components/playlist/repository/playlist-read-repository.port';

@QueryHandler(GetPlaylistQuery)
export class GetPlaylistHandler implements IQueryHandler<GetPlaylistQuery> {
  constructor(
    @Inject(PLAYLIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _playlistReadRepository: PlaylistReadRepository,
  ) {}

  async execute({ id, isPublic }: GetPlaylistQuery) {
    const foundPlaylist = await this._playlistReadRepository.findById(id, {
      isPublic,
    });

    return foundPlaylist ? PlaylistMapper.toDTO(foundPlaylist) : null;
  }
}
