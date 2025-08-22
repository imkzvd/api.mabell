import {
  UpdateTrackArtistsPayload,
  UpdateTrackFeatArtistsPayload,
  UpdateTrackFilePayload,
  UpdateTrackPayload,
} from '../types';
import { TrackWriteRepository } from '../../../../domain/components/track';
import { NotFoundException } from '../../../../shared/exceptions';
import { ArtistFileStorage, EventBus, TmpFileStorage, TrackReadRepository } from '../../../ports';
import { TrackId } from '../../../../domain/components/track/types';
import { prepareTrackEventPayload } from '../utils/prepare-track-event-payload.utility';
import { TracksUpdatedEvent, TrackUpdatedEvent } from '../../../events';
import { ArtistId } from '../../../../domain/components/artist/types';

export class TrackUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _RR: TrackReadRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async updateById(trackId: string, payload: UpdateTrackPayload): Promise<TrackId> {
    const foundTrackEntity = await this._WR.findById(trackId);

    if (!foundTrackEntity) {
      throw new NotFoundException('Track does not exist');
    }

    if (payload.name) {
      foundTrackEntity.updateName(payload.name);
    }

    if (typeof payload.isExplicit === 'boolean') {
      foundTrackEntity.updateExplicitStatus(payload.isExplicit);
    }

    if (typeof payload.isActive === 'boolean') {
      foundTrackEntity.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundTrackEntity.updatePublicStatus(payload.isPublic);
    }

    await this._WR.save(foundTrackEntity);

    const foundTrackWithAlbum = await this._RR.findById(foundTrackEntity.getId());

    if (!foundTrackWithAlbum) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(new TrackUpdatedEvent(prepareTrackEventPayload(foundTrackWithAlbum)));

    return foundTrackWithAlbum.id;
  }

  async updateFileById(trackId: string, payload: UpdateTrackFilePayload): Promise<TrackId> {
    const foundTrackEntity = await this._WR.findById(trackId);

    if (!foundTrackEntity) {
      throw new NotFoundException('Track does not exist');
    }

    const tmpFile = await this._tmpFS.findById(payload.fileId);

    if (!tmpFile) {
      throw new NotFoundException('Track file does not uploaded');
    }

    const storedFileData = await this._artistFS.saveTrack(
      foundTrackEntity.getMainArtist(),
      foundTrackEntity.getAlbum(),
      foundTrackEntity.getId(),
      tmpFile,
    );

    foundTrackEntity.updateFile(storedFileData.path);
    foundTrackEntity.updateDuration(payload.duration);

    await this._WR.save(foundTrackEntity);

    const foundTrackWithAlbum = await this._RR.findById(trackId);

    if (!foundTrackWithAlbum) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(new TrackUpdatedEvent(prepareTrackEventPayload(foundTrackWithAlbum)));

    return foundTrackWithAlbum.id;
  }

  async deleteFileById(trackId: string): Promise<TrackId> {
    const foundTrackEntity = await this._WR.findById(trackId);

    if (!foundTrackEntity) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrackEntity.deleteFile();
    foundTrackEntity.deleteDuration();
    foundTrackEntity.updateActiveStatus(false);

    await this._WR.save(foundTrackEntity);
    await this._artistFS.deleteTrack(
      foundTrackEntity.getMainArtist(),
      foundTrackEntity.getAlbum(),
      foundTrackEntity.getId(),
    );

    const foundTrackWithAlbum = await this._RR.findById(foundTrackEntity.getId());

    if (!foundTrackWithAlbum) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(new TrackUpdatedEvent(prepareTrackEventPayload(foundTrackWithAlbum)));

    return foundTrackWithAlbum.id;
  }

  async updateFeatArtistsById(
    trackId: string,
    payload: UpdateTrackFeatArtistsPayload,
  ): Promise<TrackId> {
    const foundTrackEntity = await this._WR.findById(trackId);

    if (!foundTrackEntity) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrackEntity.updateFeaturedArtists(payload.artistIds);

    await this._WR.save(foundTrackEntity);

    const foundTrackWithAlbum = await this._RR.findById(foundTrackEntity.getId());

    if (!foundTrackWithAlbum) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(new TrackUpdatedEvent(prepareTrackEventPayload(foundTrackWithAlbum)));

    return foundTrackWithAlbum.id;
  }

  async updateArtistsByAlbumId(
    albumId: string,
    payload: UpdateTrackArtistsPayload,
  ): Promise<TrackId[]> {
    const {
      items: foundTrackEntities,
      total: foundTrackEntitiesTotal,
      itemIds: foundTrackEntityIds,
    } = await this._WR.findByAlbumId(albumId);

    if (!foundTrackEntitiesTotal) return [];

    foundTrackEntities.forEach((track) => track.updateArtists(payload.artistIds));

    await this._WR.saveMany(foundTrackEntities);

    const { foundItems: foundTracks, foundIds: foundTrackIds } =
      await this._RR.findByIds(foundTrackEntityIds);

    this._EB.publish(
      new TracksUpdatedEvent({
        tracks: foundTracks.map((i) => prepareTrackEventPayload(i)),
      }),
    );

    return foundTrackIds;
  }

  async unlinkFeatArtistByArtistId(artistId: ArtistId): Promise<TrackId[]> {
    const {
      items: foundTrackEntities,
      total: foundTrackEntitiesTotal,
      itemIds: foundTrackEntityIds,
    } = await this._WR.findByFeatArtistId(artistId);

    if (!foundTrackEntitiesTotal) return [];

    foundTrackEntities.forEach((track) => track.deleteFeaturedArtist(artistId));

    await this._WR.saveMany(foundTrackEntities);

    const { foundItems: foundTracks, foundIds: foundTrackId } =
      await this._RR.findByIds(foundTrackEntityIds);

    this._EB.publish(
      new TracksUpdatedEvent({
        tracks: foundTracks.map((i) => prepareTrackEventPayload(i)),
      }),
    );

    return foundTrackId;
  }
}
