import { QueryHandler } from '@core/app/types';
import { GetPlaylistQuery } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.query';
import { PlaylistService } from '@core/app/components/playlist/services/playlist.service';

export class GetPlaylistHandler implements QueryHandler<GetPlaylistQuery> {
  constructor(private readonly _service: PlaylistService) {}

  async execute({ id, isPublic }: GetPlaylistQuery) {
    return await this._service.find(id, {
      isPublic,
    });
  }
}
