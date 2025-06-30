import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AlbumService } from '@core/app/components/album/album.service';
import { TrackService } from '@core/app/components/track/track.service';
import { GetAlbumTracksQuery } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';
import { GetAlbumTracksHandler as CoreGetAlbumTracksHandler } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.handler';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler implements IQueryHandler<GetAlbumTracksQuery> {
  private readonly _coreHandler: CoreGetAlbumTracksHandler;

  constructor(
    @Inject(AlbumService) albumService: AlbumService,
    @Inject(TrackService) trackService: TrackService,
  ) {
    this._coreHandler = new CoreGetAlbumTracksHandler(albumService, trackService);
  }

  async execute(query: GetAlbumTracksQuery) {
    return this._coreHandler.execute(query);
  }
}
