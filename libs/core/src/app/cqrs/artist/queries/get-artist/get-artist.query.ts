import { Query } from '@core/app/types';
import { ArtistDTO } from '@core/app/components/artist/dtos/artist.dto';

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
