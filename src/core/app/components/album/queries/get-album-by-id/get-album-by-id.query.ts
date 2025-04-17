import { Query } from '@nestjs/cqrs';
import { AlbumWithArtistsAndTracksDTO } from '../../dtos/album-with-artists-and-tracks.dto';

export class GetAlbumByIdQuery extends Query<AlbumWithArtistsAndTracksDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
