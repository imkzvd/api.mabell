import { AlbumWriteRepository } from '../../../../domain/components/album';
import { AlbumId } from '../../../../domain/components/album/types';

export class AlbumVerifyService {
  constructor(private readonly _WR: AlbumWriteRepository) {}

  async verify(id: string): Promise<AlbumId | null> {
    return this._WR.existsById(id);
  }
}
