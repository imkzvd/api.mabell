import { QueryHandler } from '../../../../types';
import { GetPlaylistTracksQuery } from './get-playlist-tracks.query';
import { PlaylistService } from '../../../../components/playlist';
import { TrackService } from '../../../../components/track';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos';
import { PlaylistTrackDTO } from '../../../../dtos';

export class GetPlaylistTracksHandler implements QueryHandler<GetPlaylistTracksQuery> {
  constructor(
    private readonly _playlistService: PlaylistService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ playlistId, options }: GetPlaylistTracksQuery) {
    const foundPlaylistTrackData = await this._playlistService.getTrackIdsById(playlistId);
    const slicedFoundPlaylistTrackData = foundPlaylistTrackData.slice(
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0),
    );
    const slicedFoundPlaylistTrackIds = slicedFoundPlaylistTrackData.map(({ id }) => id);

    const foundTracks = await this._trackService.findByIds(slicedFoundPlaylistTrackIds, {
      isPublic: options?.isPublic,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundTracks.items.map(
        (i, index) =>
          new PlaylistTrackDTO(
            i,
            slicedFoundPlaylistTrackData[index].id,
            slicedFoundPlaylistTrackData[index].addedAt,
          ),
      ),
      foundTracks.total,
      options?.pagination?.limit,
      options?.pagination?.offset,
    );
  }
}
