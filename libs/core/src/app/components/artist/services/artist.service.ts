import { NotFoundException } from '@core/shared/exceptions';
import { ArtistReadRepository } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { ArtistDTO } from '../dtos/artist.dto';
import ArtistMapper from '../dtos/artist.mapper';

export class ArtistService {
  constructor(private readonly _RR: ArtistReadRepository) {}

  async find(id: string, options?: Partial<{ isPublic: boolean }>): Promise<ArtistDTO | null> {
    const foundArtist = await this._RR.findById(id, options);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }

  async checkPublicStatus(id: string): Promise<boolean> {
    const foundArtist = await this._RR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return foundArtist.isPublic;
  }
}
