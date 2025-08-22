import { UpdateAlbumArtistsPayload, UpdateAlbumCoverPayload, UpdateAlbumPayload } from '../types';
import { AlbumWriteRepository } from '../../../../domain/components/album';
import { BadRequestException, NotFoundException } from '../../../../shared/exceptions';
import { AlbumReadRepository, ArtistFileStorage, EventBus, TmpFileStorage } from '../../../ports';
import { AlbumId } from '../../../../domain/components/album/types';
import {
  AlbumArtistsUpdatedEvent,
  AlbumCoverDeletedEvent,
  AlbumUpdatedEvent,
} from '../../../events';
import { prepareAlbumEventPayload } from '../utils/prepare-album-event-payload.utility';

export class AlbumUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
    private readonly _RR: AlbumReadRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async updateById(albumId: string, payload: UpdateAlbumPayload): Promise<AlbumId> {
    const foundAlbumEntity = await this._WR.findById(albumId);

    if (!foundAlbumEntity) {
      throw new NotFoundException('Album does not exist');
    }

    if (payload.name) {
      foundAlbumEntity.updateName(payload.name);
    }

    if (payload.type) {
      foundAlbumEntity.updateType(payload.type);
    }

    if (payload.genres) {
      foundAlbumEntity.updateGenres(payload.genres);
    }

    if (payload.description) {
      foundAlbumEntity.updateDescription(payload.description);
    }

    if (payload.releaseAt !== undefined) {
      foundAlbumEntity.updateReleaseDate(payload.releaseAt);
    }

    if (typeof payload.isActive === 'boolean') {
      foundAlbumEntity.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundAlbumEntity.updatePublicStatus(payload.isPublic);
    }

    await this._WR.save(foundAlbumEntity);

    const foundAlbum = await this._RR.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(new AlbumUpdatedEvent(prepareAlbumEventPayload(foundAlbum)));

    return foundAlbum.id;
  }

  async updateArtistsById(albumId: string, payload: UpdateAlbumArtistsPayload): Promise<AlbumId> {
    const foundAlbumEntity = await this._WR.findById(albumId);

    if (!foundAlbumEntity) {
      throw new NotFoundException('Album does not exist');
    }

    if (foundAlbumEntity.getMainArtist() !== payload.artists[0]) {
      throw new BadRequestException('The main artist cannot be changed');
    }

    foundAlbumEntity.updateArtists(payload.artists);
    await this._WR.save(foundAlbumEntity);

    const foundAlbum = await this._RR.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    const prepAlbumEventPayload = prepareAlbumEventPayload(foundAlbum);

    this._EB.publish(new AlbumUpdatedEvent(prepAlbumEventPayload));
    this._EB.publish(new AlbumArtistsUpdatedEvent(prepAlbumEventPayload));

    return foundAlbum.id;
  }

  async updateCoverById(albumId: string, payload: UpdateAlbumCoverPayload): Promise<AlbumId> {
    const foundAlbumEntity = await this._WR.findById(albumId);

    if (!foundAlbumEntity) {
      throw new NotFoundException('Album does not exist');
    }

    if (payload.fileId) {
      const tmpFile = await this._tmpFS.findById(payload.fileId);

      if (!tmpFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._artistFS.saveAlbumCover(
        foundAlbumEntity.getMainArtist(),
        foundAlbumEntity.getId(),
        tmpFile,
      );

      foundAlbumEntity.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundAlbumEntity.updateColor(payload.color);
    }

    await this._WR.save(foundAlbumEntity);

    const foundAlbum = await this._RR.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(new AlbumUpdatedEvent(prepareAlbumEventPayload(foundAlbum)));

    return foundAlbum.id;
  }

  async deleteCoverById(albumId: string): Promise<AlbumId> {
    const foundAlbumEntity = await this._WR.findById(albumId);

    if (!foundAlbumEntity) {
      throw new NotFoundException('Album does not exist');
    }

    foundAlbumEntity.deleteCover();
    await this._WR.save(foundAlbumEntity);
    await this._artistFS.deleteAlbumCover(
      foundAlbumEntity.getMainArtist(),
      foundAlbumEntity.getId(),
    );

    const foundAlbum = await this._RR.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    const prepAlbumEventPayload = prepareAlbumEventPayload(foundAlbum);

    this._EB.publish(new AlbumCoverDeletedEvent(prepAlbumEventPayload));
    this._EB.publish(new AlbumUpdatedEvent(prepAlbumEventPayload));

    return foundAlbum.id;
  }
}
