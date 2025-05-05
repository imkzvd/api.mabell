import { Query } from '@nestjs/cqrs';
import { ArtistDTO } from '../dtos/artist.dto';

export class GetArtistQuery extends Query<ArtistDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
