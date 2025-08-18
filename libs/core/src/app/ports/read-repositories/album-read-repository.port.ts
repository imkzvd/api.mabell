import { AlbumDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { AlbumsDTO } from '../../dtos/albums.dto';
import { ArtistId } from '../../../domain/components/artist/types';

export interface AlbumReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<AlbumDTO | null>;

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<AlbumsDTO>;

  getPublicStatus(id: string): Promise<boolean>;

  getArtistIdsById(id: string): Promise<ArtistId[]>;
}
