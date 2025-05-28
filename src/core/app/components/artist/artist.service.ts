import { Inject } from '@nestjs/common';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../domain/components/artist/repository/artist-write-repository.port';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id-service.port';
import { ArtistFactory } from '../../../domain/components/artist/artist.factory';
import { UpdateArtistAvatarPayload, UpdateArtistCoverPayload, UpdateArtistPayload } from './types';
import { NotFoundException } from '../../../shared/exceptions';
import { ArtistDTO } from './dtos/artist.dto';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../../domain/components/artist/repository/artist-read-repository.port';
import ArtistMapper from './dtos/artist.mapper';
import { ArtistId } from '../../../domain/components/artist/types';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../common/ports/file-storages/artist-file-storage.port';

export class ArtistService {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN) private readonly _wr: ArtistWriteRepository,
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN) private readonly _rr: ArtistReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _idService: IdService<ArtistId>,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN) private readonly _fs: ArtistFileStorage,
  ) {}

  async createArtist(): Promise<ArtistId> {
    const generatedId = this._idService.generate();
    const nextArtistIndex = await this._wr.getNextIndex();
    const createdArtist = ArtistFactory.create({
      id: generatedId,
      name: `Artist #${nextArtistIndex}`,
    });

    await this._wr.save(createdArtist);

    return createdArtist.getId();
  }

  async updateArtist(id: string, payload: UpdateArtistPayload): Promise<ArtistId> {
    const foundArtist = await this._wr.findById(id);

    if (!foundArtist) {
      throw new NotFoundException(`Artist does not exist`);
    }

    if (payload.name) {
      foundArtist.updateName(payload.name);
    }

    if (payload.birthName) {
      foundArtist.updateBirthName(payload.birthName);
    }

    if (payload.birthDate) {
      foundArtist.updateBirthDate(payload.birthDate);
    }

    if (payload.genres) {
      foundArtist.updateGenres(payload.genres);
    }

    if (payload.biography) {
      foundArtist.updateBiography(payload.biography);
    }

    if (typeof payload.isActive === 'boolean') {
      foundArtist.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundArtist.updatePublicStatus(payload.isPublic);
    }

    await this._wr.save(foundArtist);

    return foundArtist.getId();
  }

  async updateArtistAvatar(id: string, payload: UpdateArtistAvatarPayload): Promise<ArtistId> {
    const foundArtist = await this._wr.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    if (payload.fileId) {
      const storedFileData = await this._fs.saveArtistAvatar(foundArtist.getId(), payload.fileId);

      foundArtist.updateAvatar(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundArtist.updateAccentColor(payload.color);
    }

    await this._wr.save(foundArtist);

    return foundArtist.getId();
  }

  async deleteArtistAvatar(id: string): Promise<ArtistId> {
    const foundArtist = await this._wr.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteAvatar();
    foundArtist.deleteAccentColor();

    await this._wr.save(foundArtist);
    await this._fs.deleteArtistAvatar(foundArtist.getId());

    return foundArtist.getId();
  }

  async updateArtistCover(id: string, payload: UpdateArtistCoverPayload): Promise<ArtistId> {
    const foundArtist = await this._wr.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    if (payload.fileId) {
      const storedFileData = await this._fs.saveArtistCover(foundArtist.getId(), payload.fileId);

      foundArtist.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundArtist.updateSecondaryColor(payload.color);
    }

    await this._wr.save(foundArtist);

    return foundArtist.getId();
  }

  async deleteArtistCover(id: string): Promise<ArtistId> {
    const foundArtist = await this._wr.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteCover();
    foundArtist.deleteSecondaryColor();
    await this._wr.save(foundArtist);
    await this._fs.deleteArtistCover(foundArtist.getId());

    return foundArtist.getId();
  }

  async deleteArtist(id: string): Promise<ArtistId> {
    const deletedArtistId = await this._wr.deleteById(id);

    if (!deletedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._fs.deleteArtistDirectory(deletedArtistId);

    return deletedArtistId;
  }

  async getArtist(id: string, options?: Partial<{ isPublic: boolean }>): Promise<ArtistDTO | null> {
    const foundArtist = await this._rr.findById(id, options);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }

  async getArtistPublicStatus(id: string): Promise<boolean> {
    const foundArtist = await this._rr.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return foundArtist.isPublic;
  }

  async verifyArtistId(id: string): Promise<ArtistId | null> {
    return this._wr.existsById(id);
  }

  async verifyArtistIds(ids: string[]): Promise<{
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    return this._wr.existsByIds(ids);
  }
}
