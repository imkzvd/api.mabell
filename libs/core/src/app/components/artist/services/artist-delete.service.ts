import { NotFoundException } from '@core/shared/exceptions';
import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { ArtistFileStorage } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistDeletedEvent } from '@core/app/common/events/artist-deleted.event';

export class ArtistDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _FS: ArtistFileStorage,
  ) {}

  async delete(id: string): Promise<ArtistId> {
    const deletedArtistId = await this._WR.deleteById(id);

    if (!deletedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._FS.deleteArtistDirectory(deletedArtistId);
    this._EB.publish(new ArtistDeletedEvent({ id: deletedArtistId }));

    return deletedArtistId;
  }
}
