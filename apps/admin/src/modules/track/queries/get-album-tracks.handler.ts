import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AlbumService } from '@core/app/components/album/album.service';
import { TrackService } from '@core/app/components/track/track.service';
import { GetAlbumTracksQuery } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';
import { GetAlbumTracksHandler as CoreGetAlbumTracksHandler } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.handler';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler extends CoreGetAlbumTracksHandler {
  constructor(
    @Inject(AlbumService) albumService: AlbumService,
    @Inject(TrackService) trackService: TrackService,
  ) {
    super(albumService, trackService);
  }
}
