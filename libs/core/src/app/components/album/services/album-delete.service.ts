import { AlbumWriteRepository } from '../../../../domain/components/album';
import { NotFoundException } from '../../../../shared/exceptions';
import { EventBus } from '../../../ports';
import { AlbumId } from '../../../../domain/components/album/types';
import { AlbumDeletedEvent, AlbumsDeletedEvent } from '../../../events';

export class AlbumDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
  ) {}

  async deleteById(albumId: string): Promise<AlbumId> {
    const deletedAlbumId = await this._WR.deleteById(albumId);

    if (!deletedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(new AlbumDeletedEvent({ id: deletedAlbumId }));

    return deletedAlbumId;
  }

  async deleteByArtistId(artistId: string): Promise<AlbumId[]> {
    const { deletedIds } = await this._WR.deleteByArtistId(artistId);

    this._EB.publish(new AlbumsDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }
}
