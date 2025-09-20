import { ArtistWriteRepository } from '../../../../domain/components/artist';
import { ArtistId } from '../../../../domain/components/artist';

export class ArtistVerifyService {
  constructor(private readonly _WR: ArtistWriteRepository) {}

  verifyById(artistId: string, isPublic?: boolean): Promise<ArtistId | null> {
    return this._WR.existsById(artistId, isPublic);
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
