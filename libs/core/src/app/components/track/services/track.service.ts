import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { TrackReadRepository } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackDTO } from '../dtos/track.dto';
import TrackMapper from '../dtos/track.mapper';

export class TrackService {
  constructor(private readonly _RR: TrackReadRepository) {}

  async findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackDTO | null> {
    const foundTrack = await this._RR.findById(id, options);

    return foundTrack ? TrackMapper.toDTO(foundTrack) : null;
  }

  async findByIds(
    ids: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (TrackDTO | null)[];
    foundItems: TrackDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    return await this._RR.findByIds(ids, options);
  }

  async findByArtistId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackDTO>> {
    const result = await this._RR.findByArtistId(id, options);

    return {
      ...result,
      items: result.items.map((i) => TrackMapper.toDTO(i)),
    };
  }

  async findByAlbumId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackDTO>> {
    const result = await this._RR.findByAlbumId(id, options);

    return {
      ...result,
      items: result.items.map((i) => TrackMapper.toDTO(i)),
    };
  }
}
