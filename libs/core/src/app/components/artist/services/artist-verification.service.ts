import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';

export class ArtistVerificationService {
  constructor(private readonly _WR: ArtistWriteRepository) {}

  async verifyById(id: string): Promise<ArtistId | null> {
    return this._WR.existsById(id);
  }

  async verifyByIds(ids: string[]): Promise<{
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    return this._WR.existsByIds(ids);
  }
}
