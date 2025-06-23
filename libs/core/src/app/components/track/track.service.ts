import { NotFoundException } from '@core/shared/exceptions';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { TrackWriteRepository } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackFactory } from '@core/domain/components/track/track.factory';
import { TrackReadRepository } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { ArtistId } from '@core/domain/components/artist/types';
import { TrackDTO } from './dtos/track.dto';
import TrackMapper from './dtos/track.mapper';
import { ArtistFileStorage } from '../../common/ports/file-storages/artist-file-storage.port';
import { TmpFileStorage } from '../../common/ports/file-storages/tmp-file-storage.port';
import { EventBus } from '../../common/ports/event-bus.port';
import { TrackCreatedEvent } from '../../common/events/track-created.event';
import { TrackUpdatedEvent } from '../../common/events/track-updated.event';
import { TracksUpdatedEvent } from '../../common/events/tracks-updated.event';
import { TrackDeletedEvent } from '../../common/events/track-deleted.event';
import { TracksDeletedEvent } from '../../common/events/tracks-deleted.event';
import {
  CreateTrackPayload,
  UpdateTrackArtistsPayload,
  UpdateTrackFeatArtistsPayload,
  UpdateTrackFilePayload,
  UpdateTrackPayload,
} from './types';
import { IdService } from '../../common/ports/id.service.port';

export class TrackService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _RR: TrackReadRepository,
    private readonly _idService: IdService<TrackId>,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async createTrack(payload: CreateTrackPayload): Promise<TrackId> {
    const generatedId = this._idService.generate();
    const nextAlbumTrackIndex = await this._WR.getNextAlbumTrackIndex(payload.albumId);
    const createdTrack = TrackFactory.create({
      id: generatedId,
      name: `Track #${nextAlbumTrackIndex + 1}`,
      artists: payload.artistIds,
      album: payload.albumId,
      trackNumber: nextAlbumTrackIndex,
    });

    await this._WR.save(createdTrack);
    this._EB.publish(new TrackCreatedEvent({ id: generatedId }));

    return createdTrack.getId();
  }

  async updateTrack(id: string, payload: UpdateTrackPayload): Promise<TrackId> {
    const foundTrack = await this._WR.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    if (payload.name) {
      foundTrack.updateName(payload.name);
    }

    if (typeof payload.isExplicit === 'boolean') {
      foundTrack.updateExplicitStatus(payload.isExplicit);
    }

    if (typeof payload.isActive === 'boolean') {
      foundTrack.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundTrack.updatePublicStatus(payload.isPublic);
    }

    await this._WR.save(foundTrack);
    this._EB.publish(new TrackUpdatedEvent({ id: foundTrack.getId() }));

    return foundTrack.getId();
  }

  async updateTrackFile(id: string, payload: UpdateTrackFilePayload): Promise<TrackId> {
    const foundTrack = await this._WR.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    const tmpFile = await this._tmpFS.findById(payload.fileId);

    if (!tmpFile) {
      throw new NotFoundException('Track file does not uploaded');
    }

    const storedFileData = await this._artistFS.saveTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
      tmpFile,
    );

    foundTrack.updateFile(storedFileData.path);
    foundTrack.updateDuration(payload.duration);

    await this._WR.save(foundTrack);
    this._EB.publish(new TrackUpdatedEvent({ id: foundTrack.getId() }));

    return foundTrack.getId();
  }

  async deleteTrackFile(id: string): Promise<TrackId> {
    const foundTrack = await this._WR.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrack.deleteFile();
    foundTrack.deleteDuration();
    foundTrack.updateActiveStatus(false);

    await this._WR.save(foundTrack);
    await this._artistFS.deleteTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
    );
    this._EB.publish(new TrackUpdatedEvent({ id: foundTrack.getId() }));

    return foundTrack.getId();
  }

  async updateArtistsForTracksByAlbumId(
    albumId: string,
    payload: UpdateTrackArtistsPayload,
  ): Promise<TrackId[]> {
    const foundTracks = await this._WR.findByAlbumId(albumId);

    if (!foundTracks.total) return [];

    foundTracks.items.forEach((track) => track.updateArtists(payload.artistIds));

    await this._WR.saveMany(foundTracks.items);
    this._EB.publish(new TracksUpdatedEvent({ ids: foundTracks.itemIds }));

    return foundTracks.itemIds;
  }

  async updateFeatArtistsForTrack(
    id: string,
    payload: UpdateTrackFeatArtistsPayload,
  ): Promise<TrackId> {
    const foundTrack = await this._WR.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrack.updateFeaturedArtists(payload.artistIds);

    await this._WR.save(foundTrack);
    this._EB.publish(new TrackUpdatedEvent({ id: foundTrack.getId() }));

    return foundTrack.getId();
  }

  async unlinkFeatArtistForTracksByArtistId(artistId: ArtistId): Promise<TrackId[]> {
    const foundTracksResult = await this._WR.findByFeatArtistId(artistId);

    if (!foundTracksResult.total) return [];

    foundTracksResult.items.forEach((track) => track.deleteFeaturedArtist(artistId));

    await this._WR.saveMany(foundTracksResult.items);
    this._EB.publish(new TracksUpdatedEvent({ ids: foundTracksResult.itemIds }));

    return foundTracksResult.itemIds;
  }

  async deleteTrack(id: string): Promise<TrackId> {
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

  async getTrack(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackDTO | null> {
    const foundTrack = await this._RR.findById(id, options);

    return foundTrack ? TrackMapper.toDTO(foundTrack) : null;
  }

  async getTracksByIds(
    ids: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (TrackDTO | null)[];
    foundItems: TrackDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    return await this._RR.findByIds(ids, options);
  }

  async getTracksByArtistId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackDTO>> {
    const result = await this._RR.findByArtistId(id, options);

    return {
      ...result,
      items: result.items.map((i) => TrackMapper.toDTO(i)),
    };
  }

  async getTracksByAlbumId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackDTO>> {
    const result = await this._RR.findByAlbumId(id, options);

    return {
      ...result,
      items: result.items.map((i) => TrackMapper.toDTO(i)),
    };
  }

  async verifyTrackId(id: string): Promise<TrackId | null> {
    return this._WR.existsById(id);
  }
}
