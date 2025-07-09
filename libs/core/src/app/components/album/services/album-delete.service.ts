import { NotFoundException } from '@core/shared/exceptions';
import { AlbumWriteRepository } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumId } from '@core/domain/components/album/types';
import { EventBus } from '../../../common/ports/event-bus.port';
import { AlbumDeletedEvent } from '../../../common/events/album-deleted.event';
import { AlbumsDeletedEvent } from '../../../common/events/albums-deleted.event';

export class AlbumDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
  ) {}

  async delete(id: string): Promise<AlbumId> {
    const deletedAlbumId = await this._WR.deleteById(id);

    if (!deletedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(new AlbumDeletedEvent({ id: deletedAlbumId }));

    return deletedAlbumId;
  }

  async deleteByArtistId(id: string): Promise<AlbumId[]> {
    const { deletedIds } = await this._WR.deleteByArtistId(id);

    this._EB.publish(new AlbumsDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }
}
