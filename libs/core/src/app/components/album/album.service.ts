import { BadRequestException, NotFoundException } from '@core/shared/exceptions';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { AlbumWriteRepository } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository } from '@core/domain/components/album/repository/album-read-repository.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumFactory } from '@core/domain/components/album/album.factory';
import { ArtistId } from '@core/domain/components/artist/types';
import { IdService } from '../../common/ports/id.service.port';
import {
  CreateAlbumPayload,
  UpdateAlbumArtistsPayload,
  UpdateAlbumCoverPayload,
  UpdateAlbumPayload,
} from './types';
import AlbumMapper from './dtos/album.mapper';
import { AlbumDTO } from './dtos/album.dto';
import { ArtistFileStorage } from '../../common/ports/file-storages/artist-file-storage.port';
import { TmpFileStorage } from '../../common/ports/file-storages/tmp-file-storage.port';
import { EventBus } from '../../common/ports/event-bus.port';
import { AlbumCreatedEvent } from '../../common/events/album-created.event';
import { AlbumUpdatedEvent } from '../../common/events/album-updated.event';
import { AlbumDeletedEvent } from '../../common/events/album-deleted.event';
import { AlbumsDeletedEvent } from '../../common/events/albums-deleted.event';
import { AlbumCoverDeletedEvent } from '../../common/events/album-cover-deleted.event';
import { AlbumArtistsUpdatedEvent } from '../../common/events/album-artists-updated.event';

export class AlbumService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AlbumWriteRepository,
    private readonly _RR: AlbumReadRepository,
    private readonly _idService: IdService<AlbumId>,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async createAlbum(payload: CreateAlbumPayload): Promise<AlbumId> {
    const generatedId = this._idService.generate();
    const nextAlbumIndex = await this._WR.getNextArtistAlbumIndex(payload.artistId);
    const createdAlbum = AlbumFactory.create({
      id: generatedId,
      name: `Album #${nextAlbumIndex}`,
      artists: [payload.artistId],
    });

    await this._WR.save(createdAlbum);

    this._EB.publish(new AlbumCreatedEvent({ id: generatedId }));

    return generatedId;
  }

  async updateAlbum(id: string, payload: UpdateAlbumPayload): Promise<AlbumId> {
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
    this._EB.publish(new AlbumUpdatedEvent({ id: foundAlbum.getId() }));

    return foundAlbum.getId();
  }

  async updateAlbumArtists(id: string, payload: UpdateAlbumArtistsPayload): Promise<AlbumId> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    if (foundAlbum.getMainArtist() !== payload.artists[0]) {
      throw new BadRequestException('The main artist cannot be changed');
    }

    foundAlbum.updateArtists(payload.artists);
    await this._WR.save(foundAlbum);
    this._EB.publish(new AlbumArtistsUpdatedEvent({ id: foundAlbum.getId() }));
    this._EB.publish(new AlbumUpdatedEvent({ id: foundAlbum.getId() }));

    return foundAlbum.getId();
  }

  async updateAlbumCover(id: string, payload: UpdateAlbumCoverPayload): Promise<AlbumId> {
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
    this._EB.publish(new AlbumUpdatedEvent({ id: foundAlbum.getId() }));

    return foundAlbum.getId();
  }

  async deleteAlbumCover(id: string): Promise<AlbumId> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    foundAlbum.deleteCover();
    await this._WR.save(foundAlbum);
    await this._artistFS.deleteAlbumCover(foundAlbum.getMainArtist(), foundAlbum.getId());
    this._EB.publish(new AlbumCoverDeletedEvent({ id: foundAlbum.getId() }));
    this._EB.publish(new AlbumUpdatedEvent({ id: foundAlbum.getId() }));

    return foundAlbum.getId();
  }

  async deleteAlbum(id: string): Promise<AlbumId> {
    const deletedAlbumId = await this._WR.deleteById(id);

    if (!deletedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    this._EB.publish(new AlbumDeletedEvent({ id: deletedAlbumId }));

    return deletedAlbumId;
  }

  async deleteAlbumsByArtistId(id: string): Promise<AlbumId[]> {
    const { deletedIds } = await this._WR.deleteByArtistId(id);

    this._EB.publish(new AlbumsDeletedEvent({ ids: deletedIds }));

    return deletedIds;
  }

  async getAlbum(id: string, options?: Partial<{ isPublic: boolean }>): Promise<AlbumDTO | null> {
    const foundAlbum = await this._RR.findById(id, options);

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }

  async getAlbumsByArtistId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AlbumDTO>> {
    const resp = await this._RR.findByArtistId(id, options);

    return {
      ...resp,
      items: resp.items.map((i) => AlbumMapper.toDTO(i)),
    };
  }

  async getAlbumArtistsById(id: string): Promise<ArtistId[]> {
    const foundAlbum = await this._WR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    return foundAlbum.getArtists();
  }

  async verifyAlbumId(id: string): Promise<AlbumId | null> {
    return this._WR.existsById(id);
  }
}
