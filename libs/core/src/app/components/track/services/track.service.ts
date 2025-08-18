import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';
import { TrackReadRepository } from '../../../ports';
import { TrackWithAlbumDTO } from '../../../dtos';
import { TracksDTO } from '../../../dtos/tracks.dto';

export class TrackService {
  constructor(private readonly _RR: TrackReadRepository) {}

  findById(
    trackId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackWithAlbumDTO | null> {
    return this._RR.findById(trackId, options);
  }

  findByIds(
    trackIds: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (TrackWithAlbumDTO | null)[];
    foundItems: TrackWithAlbumDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    return this._RR.findByIds(trackIds, options);
  }

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<TracksDTO> {
    return this._RR.findByArtistId(artistId, options);
  }

  findByAlbumId(
    albumId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<TracksDTO> {
    return this._RR.findByAlbumId(albumId, options);
  }
}
