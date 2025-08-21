import { Query } from '../../../../types';
import { ArtistDTO } from '../../../../dtos';

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
