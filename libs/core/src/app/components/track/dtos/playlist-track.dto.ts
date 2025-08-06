import { TrackDTO } from './track.dto';
import { TrackId } from '@core/domain/components/track/types';

export class PlaylistTrackDTO {
  constructor(
    public readonly track: TrackDTO | null,
    public readonly trackId: TrackId,
    public readonly addedAt: Date,
  ) {}
}
