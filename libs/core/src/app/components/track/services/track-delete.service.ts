import { NotFoundException } from '@core/shared/exceptions';
import { TrackWriteRepository } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { ArtistFileStorage } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { TrackDeletedEvent } from '@core/app/common/events/track/track-deleted.event';
import { TracksDeletedEvent } from '@core/app/common/events/track/tracks-deleted.event';

export class TrackDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async delete(id: string): Promise<TrackId> {
    const foundTrack = await this._WR.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    await this._WR.deleteById(id);
    await this._artistFS.deleteTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
    );
    this._EB.publish(new TrackDeletedEvent({ id: foundTrack.getId() }));

    return foundTrack.getId();
  }

  async deleteByArtistId(id: string): Promise<TrackId[]> {
    const { deletedIds } = await this._WR.deleteByArtistId(id);

    this._EB.publish(new TracksDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }

  async deleteByAlbumId(id: string): Promise<TrackId[]> {
    const { deletedIds } = await this._WR.deleteByAlbumId(id);

    this._EB.publish(new TracksDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }
}
