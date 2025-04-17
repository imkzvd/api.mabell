import { Query } from '@nestjs/cqrs';
import { TrackWithAlbumAndArtistsDTO } from '../../dtos/track-with-album-and-artists.dto';

export class GetTrackQuery extends Query<TrackWithAlbumAndArtistsDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
