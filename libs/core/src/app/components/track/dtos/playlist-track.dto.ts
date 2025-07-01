import { TrackDTO } from './track.dto';

export class PlaylistTrackDTO {
  constructor(
    public readonly track: TrackDTO | null,
    public readonly addedAt: Date,
  ) {}
}
