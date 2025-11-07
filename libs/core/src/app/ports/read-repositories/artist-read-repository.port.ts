import { ArtistDTO, ArtistsDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { ArtistId } from '../../../domain/components/artist';

export interface ArtistReadRepository {
  findById(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  findByIds(
    artistIds: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (ArtistDTO | null)[];
    foundItems: ArtistDTO[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }>;

  findByGenres(
    genres: string[],
    options?: Partial<{ isPublic: boolean; pagination: OffsetLimitPaginationDTO }>,
  ): Promise<ArtistsDTO>;

  getPublicStatusById(artistId: string): Promise<boolean>;
}
