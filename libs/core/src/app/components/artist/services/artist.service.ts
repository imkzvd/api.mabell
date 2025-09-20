import { NotFoundException } from '../../../../shared/exceptions';
import { ArtistDTO } from '../../../dtos';
import { ArtistReadRepository } from '../../../ports';

export class ArtistService {
  constructor(private readonly _RR: ArtistReadRepository) {}

  findById(artistId: string, options?: Partial<{ isPublic: boolean }>): Promise<ArtistDTO | null> {
    return this._RR.findById(artistId, options);
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

    return foundArtists.filter(({ id }) => id !== artistId);
  }
}
