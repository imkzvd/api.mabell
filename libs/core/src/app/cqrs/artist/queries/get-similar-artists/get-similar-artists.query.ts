import { Query } from '../../../../types';
import { ArtistDTO } from '../../../../dtos';

export class GetSimilarArtistsQuery extends Query<ArtistDTO[]> {
  constructor(
    public readonly id: string,
    public readonly options?: Partial<{ isPublic: boolean; limit: number }>,
  ) {
    super();
  }
}
