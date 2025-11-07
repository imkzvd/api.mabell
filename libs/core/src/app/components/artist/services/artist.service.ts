import { NotFoundException } from '../../../../shared/exceptions';
import { ArtistDTO, ArtistsDTO } from '../../../dtos';
import { ArtistReadRepository } from '../../../ports';
import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';

export class ArtistService {
  constructor(private readonly _RR: ArtistReadRepository) {}

  findById(artistId: string, options?: Partial<{ isPublic: boolean }>): Promise<ArtistDTO | null> {
    return this._RR.findById(artistId, options);
  }

  findByIds(
    artistIds: string[],
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<{
    items: (ArtistDTO | null)[];
    foundItems: ArtistDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    return this._RR.findByIds(artistIds, options);
  }

  async checkPublicStatus(id: string): Promise<boolean> {
    const foundArtist = await this._RR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return foundArtist.isPublic;
  }

  async getSimilarArtistsById(
    artistId: string,
    options?: Partial<{ isPublic: boolean; limit: number }>,
  ): Promise<ArtistDTO[]> {
    const foundArtist = await this._RR.findById(artistId);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    const foundArtists = await this._RR.findByGenres(foundArtist.genres, options);

    return foundArtists.items.filter(({ id }) => id !== artistId);
  }

  async getByGenres(
    genres: string[],
    options?: Partial<{ isPublic: boolean; pagination: OffsetLimitPaginationDTO }>,
  ): Promise<ArtistsDTO> {
    return this._RR.findByGenres(genres, options);
  }
}
