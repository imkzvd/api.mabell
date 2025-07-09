import { AlbumWriteRepository } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumId } from '@core/domain/components/album/types';

export class AlbumVerificationService {
  constructor(private readonly _WR: AlbumWriteRepository) {}

  async verify(id: string): Promise<AlbumId | null> {
    return this._WR.existsById(id);
  }
}
