import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { GetPlaylistQuery } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.query';
import { GetPlaylistHandler as CoreGetPlaylistHandler } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.handler';

@QueryHandler(GetPlaylistQuery)
export class GetPlaylistHandler implements IQueryHandler<GetPlaylistQuery> {
  private readonly coreHandler: CoreGetPlaylistHandler;

  constructor(@Inject(PlaylistService) service: PlaylistService) {
    this.coreHandler = new CoreGetPlaylistHandler(service);
  }

  async execute(query: GetPlaylistQuery) {
    return this.coreHandler.execute(query);
  }
}
