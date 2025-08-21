import { TrackWithAlbumDTO } from './track-with-album.dto';
import { TrackId } from '../../domain/components/track';

export class PlaylistTrackDTO {
  constructor(
    public readonly track: TrackWithAlbumDTO | null,
    public readonly trackId: TrackId,
    public readonly addedAt: Date,
  ) {}
}
