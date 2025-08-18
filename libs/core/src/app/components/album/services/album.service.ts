import { AlbumWriteRepository } from '../../../../domain/components/album';
import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';
import { AlbumDTO } from '../../../dtos';
import { ArtistId } from '../../../../domain/components/artist/types';
import { AlbumReadRepository } from '../../../ports';
import { AlbumsDTO } from '../../../dtos/albums.dto';

export class AlbumService {
  constructor(
    private readonly _WR: AlbumWriteRepository,
    private readonly _RR: AlbumReadRepository,
  ) {}

  findById(albumId: string, options?: Partial<{ isPublic: boolean }>): Promise<AlbumDTO | null> {
    return this._RR.findById(albumId, options);
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

  getArtistIdsById(albumId: string): Promise<ArtistId[]> {
    return this._RR.getArtistIdsById(albumId);
  }
}
