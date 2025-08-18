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
}
