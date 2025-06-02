import { Inject } from '@nestjs/common';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../domain/components/album/repository/album-write-repository.port';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id-service.port';
import {
  CreateAlbumPayload,
  UpdateAlbumArtistsPayload,
  UpdateAlbumCoverPayload,
  UpdateAlbumPayload,
} from './types';
import { AlbumFactory } from '../../../domain/components/album/album.factory';
import { BadRequestException, NotFoundException } from '../../../shared/exceptions';
import {
  ALBUM_READ_REPOSITORY_DI_TOKEN,
  AlbumReadRepository,
} from '../../../domain/components/album/repository/album-read-repository.port';
import AlbumMapper from './dtos/album.mapper';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { AlbumDTO } from './dtos/album.dto';
import { AlbumId } from '../../../domain/components/album/types';
import { ArtistId } from '../../../domain/components/artist/types';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../common/ports/file-storages/artist-file-storage.port';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../common/ports/file-storages/tmp-file-storage.port';

export class AlbumService {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN) private readonly _albumWR: AlbumWriteRepository,
    @Inject(ALBUM_READ_REPOSITORY_DI_TOKEN) private readonly _albumRR: AlbumReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _idService: IdService<AlbumId>,
    @Inject(TMP_FILE_STORAGE_DI_TOKEN) private readonly _tmpFS: TmpFileStorage,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN) private readonly _artistFS: ArtistFileStorage,
  ) {}

  async createAlbum(payload: CreateAlbumPayload): Promise<AlbumId> {
    const generatedId = this._idService.generate();
    const nextAlbumIndex = await this._albumWR.getNextArtistAlbumIndex(payload.artistId);
    const createdAlbum = AlbumFactory.create({
      id: generatedId,
      name: `Album #${nextAlbumIndex}`,
      artists: [payload.artistId],
    });

    await this._albumWR.save(createdAlbum);

    return createdAlbum.getId();
  }

  async updateAlbum(id: string, payload: UpdateAlbumPayload): Promise<AlbumId> {
    const foundAlbum = await this._albumWR.findById(id);

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

    await this._albumWR.save(foundAlbum);

    return foundAlbum.getId();
  }

  async updateAlbumArtists(id: string, payload: UpdateAlbumArtistsPayload): Promise<AlbumId> {
    const foundAlbum = await this._albumWR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    if (foundAlbum.getMainArtist() !== payload.artists[0]) {
      throw new BadRequestException('The main artist cannot be changed');
    }

    foundAlbum.updateArtists(payload.artists);
    await this._albumWR.save(foundAlbum);

    return foundAlbum.getId();
  }

  async updateAlbumCover(id: string, payload: UpdateAlbumCoverPayload): Promise<AlbumId> {
    const foundAlbum = await this._albumWR.findById(id);

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

    await this._albumWR.save(foundAlbum);

    return foundAlbum.getId();
  }

  async deleteAlbumCover(id: string): Promise<AlbumId> {
    const foundAlbum = await this._albumWR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    foundAlbum.deleteCover();
    foundAlbum.deleteColor();

    await this._albumWR.save(foundAlbum);
    await this._artistFS.deleteAlbumCover(foundAlbum.getMainArtist(), foundAlbum.getId());

    return foundAlbum.getId();
  }

  async deleteAlbum(id: string): Promise<AlbumId> {
    const deletedAlbumId = await this._albumWR.deleteById(id);

    if (!deletedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    return deletedAlbumId;
  }

  async deleteAlbumsByArtistId(id: string): Promise<AlbumId[]> {
    const { deletedIds } = await this._albumWR.deleteByArtistId(id);

    return deletedIds;
  }

  async getAlbum(id: string, options?: Partial<{ isPublic: boolean }>): Promise<AlbumDTO | null> {
    const foundAlbum = await this._albumRR.findById(id, options);

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }

  async getAlbumsByArtistId(
    id: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AlbumDTO>> {
    const resp = await this._albumRR.findByArtistId(id, options);

    return {
      ...resp,
      items: resp.items.map((i) => AlbumMapper.toDTO(i)),
    };
  }

  async getAlbumArtistsById(id: string): Promise<ArtistId[]> {
    const foundAlbum = await this._albumWR.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    return foundAlbum.getArtists();
  }

  async verifyAlbumId(id: string): Promise<AlbumId | null> {
    return this._albumWR.existsById(id);
  }
}
