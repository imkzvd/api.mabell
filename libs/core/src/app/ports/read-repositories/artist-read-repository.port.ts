import { ArtistDTO, ArtistsDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';

export interface ArtistReadRepository {
  findById(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  findByGenres(
    genres: string[],
    options?: Partial<{ isPublic: boolean; pagination: OffsetLimitPaginationDTO }>,
  ): Promise<ArtistsDTO>;

  getPublicStatusById(artistId: string): Promise<boolean>;
}
