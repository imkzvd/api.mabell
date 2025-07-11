import { QueryHandler } from '@nestjs/cqrs';
import { GetAlbumTracksQuery } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';
import { GetAlbumTracksHandler as CoreGetAlbumTracksHandler } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.handler';
import { AlbumVerifyService } from '@core/app/components/album/services/album-verify.service';
import { TrackService } from '@core/app/components/track/services/track.service';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler extends CoreGetAlbumTracksHandler {
  constructor(albumVerifyService: AlbumVerifyService, trackService: TrackService) {
    super(albumVerifyService, trackService);
  }
}
