import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackService } from '../../../../components/track/track.service';
import { GetPlaylistTracksQuery } from './get-playlist-tracks.query';
import { PlaylistService } from '../../../../components/playlist/playlist.service';
import { PlaylistTrackDTO } from '../../../../components/track/dtos/playlist-track.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@QueryHandler(GetPlaylistTracksQuery)
export class GetPlaylistTracksHandler implements IQueryHandler<GetPlaylistTracksQuery> {
  constructor(
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(TrackService) private readonly _trackService: TrackService,
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
