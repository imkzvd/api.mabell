import { AlbumDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { AlbumsDTO } from '../../dtos';
import { ArtistId } from '../../../domain/components/artist';
import { AlbumId } from '../../../domain/components/album';

export interface AlbumReadRepository {
  findById(
    albumId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<AlbumDTO | null>;

  findByIds(
    albumIds: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (AlbumDTO | null)[];
    foundItems: AlbumDTO[];
    foundIds: AlbumId[];
    total: number;
    missingIds: string[];
  }>;

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<AlbumsDTO>;

  findLatestAlbumByArtistId(
    artistId: string,
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<AlbumDTO | null>;

  findByGenres(
    genres: string[],
    options?: Partial<{ isPublic: boolean; pagination: OffsetLimitPaginationDTO }>,
  ): Promise<AlbumsDTO>;

  getPublicStatusById(albumId: string): Promise<boolean>;

  getArtistIdsById(albumId: string): Promise<ArtistId[]>;
}
