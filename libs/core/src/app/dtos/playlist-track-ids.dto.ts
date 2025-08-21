import { OffsetLimitPaginationResponseDTO } from '../../shared/dtos';
import { TrackId } from '../../domain/components/track';

export class PlaylistTrackIdsDTO extends OffsetLimitPaginationResponseDTO<{
  id: TrackId;
  addedAt: Date;
}> {}
