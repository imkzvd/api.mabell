import { Query } from '@nestjs/cqrs';
import { ArtistDTO } from '../../../../components/artist/dtos/artist.dto';

export class GetArtistQuery extends Query<ArtistDTO | null> {
  constructor(
    public readonly id: string,
    public readonly options?: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
