import { ArtistWriteRepository } from '../../../../domain/components/artist';
import { NotFoundException } from '../../../../shared/exceptions';
import { ArtistFileStorage, EventBus } from '../../../ports';
import { ArtistId } from '../../../../domain/components/artist/types';
import { ArtistDeletedEvent } from '../../../events';

export class ArtistDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _FS: ArtistFileStorage,
  ) {}

  async deleteById(artistId: string): Promise<ArtistId> {
    const deletedArtistId = await this._WR.deleteById(artistId);

    if (!deletedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._FS.deleteArtistDirectory(deletedArtistId);
    this._EB.publish(new ArtistDeletedEvent({ id: deletedArtistId }));

    return deletedArtistId;
  }
}
