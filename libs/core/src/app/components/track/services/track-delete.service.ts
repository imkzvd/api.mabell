import { TrackWriteRepository } from '../../../../domain/components/track';
import { NotFoundException } from '../../../../shared/exceptions';
import { ArtistFileStorage, EventBus } from '../../../ports';
import { TrackId } from '../../../../domain/components/track/types';
import { TrackDeletedEvent, TracksDeletedEvent } from '../../../events';

export class TrackDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async deleteById(trackId: string): Promise<TrackId> {
    const foundTrack = await this._WR.findById(trackId);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    await this._WR.deleteById(trackId);
    await this._artistFS.deleteTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
    );

    this._EB.publish(new TrackDeletedEvent({ id: foundTrack.getId() }));

    return foundTrack.getId();
  }

  async deleteByArtistId(artistId: string): Promise<TrackId[]> {
    const { deletedIds } = await this._WR.deleteByArtistId(artistId);

    this._EB.publish(new TracksDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }

  async deleteByAlbumId(albumId: string): Promise<TrackId[]> {
    const { deletedIds } = await this._WR.deleteByAlbumId(albumId);

    this._EB.publish(new TracksDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }
}
