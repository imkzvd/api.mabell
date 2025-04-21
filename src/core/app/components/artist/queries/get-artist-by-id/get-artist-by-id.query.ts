import { Query } from '@nestjs/cqrs';
import { ArtistDTO } from '../dtos/artist.dto';

export class GetArtistByIdQuery extends Query<ArtistDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
