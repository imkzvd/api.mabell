import { ArtistWriteRepository } from '../../../../domain/components/artist';
import { ArtistId } from '../../../../domain/components/artist/types';

export class ArtistVerifyService {
  constructor(private readonly _WR: ArtistWriteRepository) {}

  verifyById(artistId: string): Promise<ArtistId | null> {
    return this._WR.existsById(artistId);
  }

  verifyByIds(artistIds: string[]): Promise<{
    items: (ArtistId | null)[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    return this._WR.existsByIds(artistIds);
  }
}
