import { NotFoundException } from '@core/shared/exceptions';
import { TrackWriteRepository } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { ArtistId } from '@core/domain/components/artist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { TrackUpdatedEvent } from '@core/app/common/events/track/track-updated.event';
import { TracksUpdatedEvent } from '@core/app/common/events/track/tracks-updated.event';
import {
  UpdateTrackArtistsPayload,
  UpdateTrackFeatArtistsPayload,
  UpdateTrackFilePayload,
  UpdateTrackPayload,
} from '../types';

export class TrackUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: TrackWriteRepository,
    private readonly _RR: TrackReadRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async update(id: string, payload: UpdateTrackPayload): Promise<TrackId> {
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

    const foundTrackWithAlbumAndArtists = await this._RR.findById(id);

    if (!foundTrackWithAlbumAndArtists) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(
      new TrackUpdatedEvent({
        id: foundTrackWithAlbumAndArtists.id,
        name: foundTrackWithAlbumAndArtists.name,
        album: {
          id: foundTrackWithAlbumAndArtists.album.id,
          name: foundTrackWithAlbumAndArtists.album.name,
          isPublic: foundTrackWithAlbumAndArtists.album.isPublic,
        },
        artists: foundTrackWithAlbumAndArtists.artists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        featArtists: foundTrackWithAlbumAndArtists.featArtists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        cover: foundTrackWithAlbumAndArtists.album.cover,
        isPublic: foundTrackWithAlbumAndArtists.isPublic,
        isExplicit: foundTrackWithAlbumAndArtists.isExplicit,
      }),
    );

    return foundTrack.getId();
  }

  async updateFile(id: string, payload: UpdateTrackFilePayload): Promise<TrackId> {
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

    const foundTrackWithAlbumAndArtists = await this._RR.findById(id);

    if (!foundTrackWithAlbumAndArtists) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(
      new TrackUpdatedEvent({
        id: foundTrackWithAlbumAndArtists.id,
        name: foundTrackWithAlbumAndArtists.name,
        album: {
          id: foundTrackWithAlbumAndArtists.album.id,
          name: foundTrackWithAlbumAndArtists.album.name,
          isPublic: foundTrackWithAlbumAndArtists.album.isPublic,
        },
        artists: foundTrackWithAlbumAndArtists.artists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        featArtists: foundTrackWithAlbumAndArtists.featArtists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        cover: foundTrackWithAlbumAndArtists.album.cover,
        isPublic: foundTrackWithAlbumAndArtists.isPublic,
        isExplicit: foundTrackWithAlbumAndArtists.isExplicit,
      }),
    );

    return foundTrack.getId();
  }

  async deleteFile(id: string): Promise<TrackId> {
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

    const foundTrackWithAlbumAndArtists = await this._RR.findById(id);

    if (!foundTrackWithAlbumAndArtists) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(
      new TrackUpdatedEvent({
        id: foundTrackWithAlbumAndArtists.id,
        name: foundTrackWithAlbumAndArtists.name,
        album: {
          id: foundTrackWithAlbumAndArtists.album.id,
          name: foundTrackWithAlbumAndArtists.album.name,
          isPublic: foundTrackWithAlbumAndArtists.album.isPublic,
        },
        artists: foundTrackWithAlbumAndArtists.artists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        featArtists: foundTrackWithAlbumAndArtists.featArtists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        cover: foundTrackWithAlbumAndArtists.album.cover,
        isPublic: foundTrackWithAlbumAndArtists.isPublic,
        isExplicit: foundTrackWithAlbumAndArtists.isExplicit,
      }),
    );

    return foundTrack.getId();
  }

  async updateFeatArtists(id: string, payload: UpdateTrackFeatArtistsPayload): Promise<TrackId> {
    const foundTrack = await this._WR.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrack.updateFeaturedArtists(payload.artistIds);

    await this._WR.save(foundTrack);

    const foundTrackWithAlbumAndArtists = await this._RR.findById(id);

    if (!foundTrackWithAlbumAndArtists) {
      throw new NotFoundException('Track does not exist');
    }

    this._EB.publish(
      new TrackUpdatedEvent({
        id: foundTrackWithAlbumAndArtists.id,
        name: foundTrackWithAlbumAndArtists.name,
        album: {
          id: foundTrackWithAlbumAndArtists.album.id,
          name: foundTrackWithAlbumAndArtists.album.name,
          isPublic: foundTrackWithAlbumAndArtists.album.isPublic,
        },
        artists: foundTrackWithAlbumAndArtists.artists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        featArtists: foundTrackWithAlbumAndArtists.featArtists.map(({ id, name, isPublic }) => ({
          id,
          name,
          isPublic,
        })),
        cover: foundTrackWithAlbumAndArtists.album.cover,
        isPublic: foundTrackWithAlbumAndArtists.isPublic,
        isExplicit: foundTrackWithAlbumAndArtists.isExplicit,
      }),
    );

    return foundTrack.getId();
  }

  async updateArtistsByAlbumId(
    albumId: string,
    payload: UpdateTrackArtistsPayload,
  ): Promise<TrackId[]> {
    const foundTracks = await this._WR.findByAlbumId(albumId);

    if (!foundTracks.total) return [];

    foundTracks.items.forEach((track) => track.updateArtists(payload.artistIds));

    await this._WR.saveMany(foundTracks.items);

    const foundTrackWithAlbumAndArtists = await this._RR.findByIds(foundTracks.itemIds);

    const eventPayload = foundTrackWithAlbumAndArtists.foundItems.map((track) => ({
      id: track.id,
      name: track.name,
      album: {
        id: track.album.id,
        name: track.album.name,
        isPublic: track.album.isPublic,
      },
      artists: track.artists.map(({ id, name, isPublic }) => ({ id, name, isPublic })),
      featArtists: track.featArtists.map(({ id, name, isPublic }) => ({
        id,
        name,
        isPublic,
      })),
      cover: track.album.cover,
      isPublic: track.isPublic,
      isExplicit: track.isExplicit,
    }));
    this._EB.publish(new TracksUpdatedEvent({ tracks: eventPayload }));

    return foundTracks.itemIds;
  }

  async unlinkFeatArtistByArtistId(artistId: ArtistId): Promise<TrackId[]> {
    const foundTracksResult = await this._WR.findByFeatArtistId(artistId);

    if (!foundTracksResult.total) return [];

    foundTracksResult.items.forEach((track) => track.deleteFeaturedArtist(artistId));

    await this._WR.saveMany(foundTracksResult.items);

    const foundTrackWithAlbumAndArtists = await this._RR.findByIds(foundTracksResult.itemIds);

    const eventPayload = foundTrackWithAlbumAndArtists.foundItems.map((track) => ({
      id: track.id,
      name: track.name,
      album: {
        id: track.album.id,
        name: track.album.name,
        isPublic: track.album.isPublic,
      },
      artists: track.artists.map(({ id, name, isPublic }) => ({ id, name, isPublic })),
      featArtists: track.featArtists.map(({ id, name, isPublic }) => ({
        id,
        name,
        isPublic,
      })),
      cover: track.album.cover,
      isPublic: track.isPublic,
      isExplicit: track.isExplicit,
    }));
    this._EB.publish(new TracksUpdatedEvent({ tracks: eventPayload }));

    return foundTracksResult.itemIds;
  }
}
