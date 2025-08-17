import { TrackDTO } from './track.dto';
import { TrackId } from '../../../../domain/components/track';

export class PlaylistTrackDTO {
  constructor(
    public readonly track: TrackDTO | null,
    public readonly trackId: TrackId,
    public readonly addedAt: Date,
  ) {}
}
