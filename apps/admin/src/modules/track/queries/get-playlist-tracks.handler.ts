import { QueryHandler } from '@nestjs/cqrs';
import { GetPlaylistTracksQuery } from '@core/app/cqrs/track/queries/get-playlist-tracks/get-playlist-tracks.query';
import { GetPlaylistTracksHandler as CoreGetPlaylistTracksHandler } from '@core/app/cqrs/track/queries/get-playlist-tracks/get-playlist-tracks.handler';
import { PlaylistService } from '@core/app/components/playlist/services/playlist.service';
import { TrackService } from '@core/app/components/track/services/track.service';

@QueryHandler(GetPlaylistTracksQuery)
export class GetPlaylistTracksHandler extends CoreGetPlaylistTracksHandler {
  constructor(playlistService: PlaylistService, trackService: TrackService) {
    super(playlistService, trackService);
  }
}
