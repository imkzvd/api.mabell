import { TrackDTO } from './track.dto';

export class PlaylistTrackDTO {
  constructor(
    public readonly track: TrackDTO,
    public readonly addedAt: Date,
  ) {}
}
