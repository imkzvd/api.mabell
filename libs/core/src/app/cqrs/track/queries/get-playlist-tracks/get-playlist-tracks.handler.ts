import { QueryHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { PlaylistTrackDTO } from '@core/app/components/track/dtos/playlist-track.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { GetPlaylistTracksQuery } from '@core/app/cqrs/track/queries/get-playlist-tracks/get-playlist-tracks.query';

export class GetPlaylistTracksHandler implements QueryHandler<GetPlaylistTracksQuery> {
  constructor(
    private readonly _playlistService: PlaylistService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ playlistId, options }: GetPlaylistTracksQuery) {
    const foundPlaylistTrackData = await this._playlistService.getPlaylistTrackIds(playlistId);
    const slicedFoundPlaylistTrackData = foundPlaylistTrackData.slice(
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0),
    );
    const slicedFoundPlaylistTrackIds = slicedFoundPlaylistTrackData.map(({ id }) => id);

    const foundTracks = await this._trackService.getTracksByIds(slicedFoundPlaylistTrackIds, {
      isPublic: options?.isPublic,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundTracks.items.map(
        (i, index) => new PlaylistTrackDTO(i, slicedFoundPlaylistTrackData[index].addedAt),
      ),
      foundTracks.total,
      options?.pagination?.limit || 50,
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0) >
        foundPlaylistTrackData.length,
    );
  }
}
