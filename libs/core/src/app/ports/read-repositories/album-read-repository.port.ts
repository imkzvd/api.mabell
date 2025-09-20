import { AlbumDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { AlbumsDTO } from '../../dtos';
import { ArtistId } from '../../../domain/components/artist';

export interface AlbumReadRepository {
  findById(
    albumId: string,
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

  findLatestAlbumByArtistId(
    artistId: string,
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<AlbumDTO | null>;

  getPublicStatusById(albumId: string): Promise<boolean>;

  getArtistIdsById(albumId: string): Promise<ArtistId[]>;
}
