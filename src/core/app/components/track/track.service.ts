import { Inject } from '@nestjs/common';
import {
  CreateTrackPayload,
  UpdateTrackArtistsPayload,
  UpdateTrackFeatArtistsPayload,
  UpdateTrackFilePayload,
  UpdateTrackPayload,
} from './types';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../domain/components/track/repository/track-write-repository.port';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id-service.port';
import { NotFoundException } from '../../../shared/exceptions';
import { TrackFactory } from '../../../domain/components/track/track.factory';
import { TrackDTO } from './dtos/track.dto';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../../domain/components/track/repository/track-read-repository.port';
import TrackMapper from './dtos/track.mapper';
import { OffsetLimitPaginationResponseDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { TrackId } from '../../../domain/components/track/types';
import { ArtistId } from '../../../domain/components/artist/types';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../common/ports/file-storages/artist-file-storage.port';

export class TrackService {
  constructor(
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN) private readonly _wr: TrackWriteRepository,
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN) private readonly _rr: TrackReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _idService: IdService<TrackId>,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN) private readonly _fs: ArtistFileStorage,
  ) {}

  async createTrack(payload: CreateTrackPayload): Promise<TrackId> {
    const generatedId = this._idService.generate();
    const nextAlbumTrackIndex = await this._wr.getNextAlbumTrackIndex(payload.albumId);
    const createdTrack = TrackFactory.create({
      id: generatedId,
      name: `Track #${nextAlbumTrackIndex + 1}`,
      artists: payload.artistIds,
      album: payload.albumId,
      trackNumber: nextAlbumTrackIndex,
    });

    await this._wr.save(createdTrack);

    return createdTrack.getId();
  }

  async updateTrack(id: string, payload: UpdateTrackPayload): Promise<TrackId> {
    const foundTrack = await this._wr.findById(id);

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

    await this._wr.save(foundTrack);

    return foundTrack.getId();
  }

  async updateTrackFile(id: string, payload: UpdateTrackFilePayload): Promise<TrackId> {
    const foundTrack = await this._wr.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    const storedFileData = await this._fs.saveTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
      payload.fileId,
    );

    foundTrack.updateFile(storedFileData.path);
    foundTrack.updateDuration(payload.duration);

    await this._wr.save(foundTrack);

    return foundTrack.getId();
  }

  async deleteTrackFile(id: string): Promise<TrackId> {
    const foundTrack = await this._wr.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrack.deleteFile();
    foundTrack.deleteDuration();
    foundTrack.updateActiveStatus(false);

    await this._wr.save(foundTrack);
    await this._fs.deleteTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
    );

    return foundTrack.getId();
  }

  async updateArtistsForTracksByAlbumId(
    albumId: string,
    payload: UpdateTrackArtistsPayload,
  ): Promise<TrackId[]> {
    const foundTracks = await this._wr.findByAlbumId(albumId);

    if (!foundTracks.total) return [];

    foundTracks.items.forEach((track) => track.updateArtists(payload.artistIds));

    await this._wr.saveMany(foundTracks.items);

    return foundTracks.itemIds;
  }

  async updateFeatArtistsForTrack(
    id: string,
    payload: UpdateTrackFeatArtistsPayload,
  ): Promise<TrackId> {
    const foundTrack = await this._wr.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrack.updateFeaturedArtists(payload.artistIds);

    await this._wr.save(foundTrack);

    return foundTrack.getId();
  }

  async unlinkFeatArtistForTracksByArtistId(artistId: ArtistId): Promise<TrackId[]> {
    const foundTracksResult = await this._wr.findByFeatArtistId(artistId);

    if (!foundTracksResult.total) return [];

    foundTracksResult.items.forEach((track) => track.deleteFeaturedArtist(artistId));

    await this._wr.saveMany(foundTracksResult.items);

    return foundTracksResult.itemIds;
  }

  async deleteTrack(id: string): Promise<TrackId> {
    const foundTrack = await this._wr.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    await this._wr.deleteById(id);
    await this._fs.deleteTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
    );

    return foundTrack.getId();
  }

  async deleteByArtistId(id: string): Promise<TrackId[]> {
    const { deletedIds } = await this._wr.deleteByArtistId(id);

    return deletedIds;
  }

  async deleteByAlbumId(id: string): Promise<TrackId[]> {
    const { deletedIds } = await this._wr.deleteByAlbumId(id);

    return deletedIds;
  }

  async getTrack(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackDTO | null> {
    const foundTrack = await this._rr.findById(id, options);

    return foundTrack ? TrackMapper.toDTO(foundTrack) : null;
  }

  async getTracksByIds(
    ids: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{ items: TrackDTO[]; foundIds: string[]; total: number; missingIds: string[] }> {
    return await this._rr.findByIds(ids, options);
  }

  async getTracksByArtistId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackDTO>> {
    const result = await this._rr.findByArtistId(id, options);

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
    const result = await this._rr.findByAlbumId(id, options);

    return {
      ...result,
      items: result.items.map((i) => TrackMapper.toDTO(i)),
    };
  }

  async verifyTrackId(id: string): Promise<TrackId | null> {
    return this._wr.existsById(id);
  }
}
