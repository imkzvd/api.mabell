import { BadRequestException, NotFoundException } from '@core/shared/exceptions';
import { AlbumWriteRepository } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository } from '@core/domain/components/album/repository/album-read-repository.port';
import { AlbumId } from '@core/domain/components/album/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { AlbumUpdatedEvent } from '@core/app/common/events/album/album-updated.event';
import { AlbumArtistsUpdatedEvent } from '@core/app/common/events/album/album-artists-updated.event';
import { AlbumCoverDeletedEvent } from '@core/app/common/events/album/album-cover-deleted.event';
import { UpdateAlbumArtistsPayload, UpdateAlbumCoverPayload, UpdateAlbumPayload } from '../types';

export class AlbumUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
    private readonly _RR: AlbumReadRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async update(id: string, payload: UpdateAlbumPayload): Promise<AlbumId> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    if (payload.name) {
      foundAlbum.updateName(payload.name);
    }

    if (payload.type) {
      foundAlbum.updateType(payload.type);
    }

    if (payload.genres) {
      foundAlbum.updateGenres(payload.genres);
    }

    if (payload.description) {
      foundAlbum.updateDescription(payload.description);
    }

    if (payload.releaseAt !== undefined) {
      foundAlbum.updateReleaseDate(payload.releaseAt);
    }

    if (typeof payload.isActive === 'boolean') {
      foundAlbum.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundAlbum.updatePublicStatus(payload.isPublic);
    }

    await this._WR.save(foundAlbum);

    const foundAlbumWithArtists = await this._RR.findById(id);

    if (!foundAlbumWithArtists) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(
      new AlbumUpdatedEvent({
        id: foundAlbumWithArtists.id,
        name: foundAlbumWithArtists.name,
        artists: foundAlbumWithArtists.artists.map(({ id, name }) => ({ id, name })),
        type: foundAlbumWithArtists.type,
        cover: foundAlbumWithArtists.cover,
      }),
    );

    return foundAlbum.getId();
  }

  async updateArtists(id: string, payload: UpdateAlbumArtistsPayload): Promise<AlbumId> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    if (foundAlbum.getMainArtist() !== payload.artists[0]) {
      throw new BadRequestException('The main artist cannot be changed');
    }

    foundAlbum.updateArtists(payload.artists);
    await this._WR.save(foundAlbum);

    const foundAlbumWithArtists = await this._RR.findById(id);

    if (!foundAlbumWithArtists) {
      throw new NotFoundException('Album does not exist');
    }

    const eventPayload = {
      id: foundAlbumWithArtists.id,
      name: foundAlbumWithArtists.name,
      artists: foundAlbumWithArtists.artists.map(({ id, name }) => ({ id, name })),
      type: foundAlbumWithArtists.type,
      cover: foundAlbumWithArtists.cover,
    };

    this._EB.publish(new AlbumArtistsUpdatedEvent(eventPayload));
    this._EB.publish(new AlbumUpdatedEvent(eventPayload));

    return foundAlbum.getId();
  }

  async updateCover(id: string, payload: UpdateAlbumCoverPayload): Promise<AlbumId> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    if (payload.fileId) {
      const tmpFile = await this._tmpFS.findById(payload.fileId);

      if (!tmpFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._artistFS.saveAlbumCover(
        foundAlbum.getMainArtist(),
        foundAlbum.getId(),
        tmpFile,
      );

      foundAlbum.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundAlbum.updateColor(payload.color);
    }

    await this._WR.save(foundAlbum);

    const foundAlbumWithArtists = await this._RR.findById(id);

    if (!foundAlbumWithArtists) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(
      new AlbumUpdatedEvent({
        id: foundAlbumWithArtists.id,
        name: foundAlbumWithArtists.name,
        artists: foundAlbumWithArtists.artists.map(({ id, name }) => ({ id, name })),
        type: foundAlbumWithArtists.type,
        cover: foundAlbumWithArtists.cover,
      }),
    );

    return foundAlbum.getId();
  }

  async deleteCover(id: string): Promise<AlbumId> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    foundAlbum.deleteCover();
    await this._WR.save(foundAlbum);
    await this._artistFS.deleteAlbumCover(foundAlbum.getMainArtist(), foundAlbum.getId());

    const foundAlbumWithArtists = await this._RR.findById(id);

    if (!foundAlbumWithArtists) {
      throw new NotFoundException('Album does not exist');
    }

    const eventPayload = {
      id: foundAlbumWithArtists.id,
      name: foundAlbumWithArtists.name,
      artists: foundAlbumWithArtists.artists.map(({ id, name }) => ({ id, name })),
      type: foundAlbumWithArtists.type,
      cover: foundAlbumWithArtists.cover,
    };

    this._EB.publish(new AlbumCoverDeletedEvent(eventPayload));
    this._EB.publish(new AlbumUpdatedEvent(eventPayload));

    return foundAlbum.getId();
  }
}
