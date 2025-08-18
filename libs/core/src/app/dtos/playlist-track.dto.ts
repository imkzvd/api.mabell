import { TrackId } from '../../domain/components/track/types';
import { TrackWithAlbumDTO } from './track-with-album.dto';

export class PlaylistTrackDTO {
  constructor(
    public readonly track: TrackWithAlbumDTO | null,
    public readonly trackId: TrackId,
    public readonly addedAt: Date,
  ) {}
}
