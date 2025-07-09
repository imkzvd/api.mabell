import { NotFoundException } from '@core/shared/exceptions';
import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { ArtistFileStorage } from '../../../common/ports/file-storages/artist-file-storage.port';
import { EventBus } from '../../../common/ports/event-bus.port';
import { ArtistDeletedEvent } from '../../../common/events/artist-deleted.event';

export class ArtistDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async delete(id: string): Promise<ArtistId> {
    const deletedArtistId = await this._WR.deleteById(id);

    if (!deletedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._artistFS.deleteArtistDirectory(deletedArtistId);
    this._EB.publish(new ArtistDeletedEvent({ id: deletedArtistId }));

    return deletedArtistId;
  }
}
