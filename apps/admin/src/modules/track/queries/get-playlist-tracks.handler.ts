import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { GetPlaylistTracksQuery } from '@core/app/cqrs/track/queries/get-playlist-tracks/get-playlist-tracks.query';
import { GetPlaylistTracksHandler as CoreGetPlaylistTracksHandler } from '@core/app/cqrs/track/queries/get-playlist-tracks/get-playlist-tracks.handler';

@QueryHandler(GetPlaylistTracksQuery)
export class GetPlaylistTracksHandler implements IQueryHandler<GetPlaylistTracksQuery> {
  private readonly _coreHandler: CoreGetPlaylistTracksHandler;

  constructor(
    @Inject(PlaylistService) playlistService: PlaylistService,
    @Inject(TrackService) trackService: TrackService,
  ) {
    this._coreHandler = new CoreGetPlaylistTracksHandler(playlistService, trackService);
  }

  async execute(query: GetPlaylistTracksQuery) {
    return this._coreHandler.execute(query);
  }
}
