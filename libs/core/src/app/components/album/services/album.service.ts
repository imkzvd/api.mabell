import { NotFoundException } from '@core/shared/exceptions';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { AlbumWriteRepository } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository } from '@core/domain/components/album/repository/album-read-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import AlbumMapper from '../dtos/album.mapper';
import { AlbumDTO } from '../dtos/album.dto';

export class AlbumService {
  constructor(
    private readonly _WR: AlbumWriteRepository,
    private readonly _RR: AlbumReadRepository,
  ) {}

  async find(id: string, options?: Partial<{ isPublic: boolean }>): Promise<AlbumDTO | null> {
    const foundAlbum = await this._RR.findById(id, options);

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }

  async findByArtistId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AlbumDTO>> {
    const resp = await this._RR.findByArtistId(id, options);

    return {
      ...resp,
      items: resp.items.map((i) => AlbumMapper.toDTO(i)),
    };
  }

  async getAlbumArtistIds(id: string): Promise<ArtistId[]> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    return foundAlbum.getArtists();
  }
}
