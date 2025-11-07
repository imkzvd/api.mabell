import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';
import { ArtistId } from '../../../../domain/components/artist';
import { AlbumReadRepository } from '../../../ports';
import { AlbumDTO } from '../../../dtos';
import { AlbumsDTO } from '../../../dtos';

export class AlbumService {
  constructor(private readonly _RR: AlbumReadRepository) {}

  findById(albumId: string, options?: Partial<{ isPublic: boolean }>): Promise<AlbumDTO | null> {
    return this._RR.findById(albumId, options);
  }

  findByIds(
    albumIds: string[],
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<{
    items: (AlbumDTO | null)[];
    foundItems: AlbumDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    return this._RR.findByIds(albumIds, options);
  }

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<AlbumsDTO> {
    return this._RR.findByArtistId(artistId, options);
  }

  findLatestAlbumByArtistId(
    artistId: string,
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<AlbumDTO | null> {
    return this._RR.findLatestAlbumByArtistId(artistId, options);
  }

  getArtistIdsById(albumId: string): Promise<ArtistId[]> {
    return this._RR.getArtistIdsById(albumId);
  }

  async getByGenres(
    genres: string[],
    options?: Partial<{ isPublic: boolean; pagination: OffsetLimitPaginationDTO }>,
  ): Promise<AlbumsDTO> {
    return this._RR.findByGenres(genres, options);
  }
}
