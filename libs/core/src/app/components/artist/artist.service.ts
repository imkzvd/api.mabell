import { NotFoundException } from '@core/shared/exceptions';
import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistFactory } from '@core/domain/components/artist/artist.factory';
import { ArtistReadRepository } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { IdService } from '../../common/ports/id.service.port';
import { UpdateArtistAvatarPayload, UpdateArtistCoverPayload, UpdateArtistPayload } from './types';
import { ArtistDTO } from './dtos/artist.dto';
import ArtistMapper from './dtos/artist.mapper';
import { ArtistFileStorage } from '../../common/ports/file-storages/artist-file-storage.port';
import { TmpFileStorage } from '../../common/ports/file-storages/tmp-file-storage.port';
import { EventBus } from '../../common/ports/event-bus.port';
import { ArtistCreatedEvent } from '../../common/events/artist-created.event';
import { ArtistUpdatedEvent } from '../../common/events/artist-updated.event';
import { ArtistDeletedEvent } from '../../common/events/artist-deleted.event';

export class ArtistService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _RR: ArtistReadRepository,
    private readonly _idService: IdService<ArtistId>,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async createArtist(): Promise<ArtistId> {
    const generatedId = this._idService.generate();
    const nextArtistIndex = await this._WR.getNextIndex();
    const createdArtist = ArtistFactory.create({
      id: generatedId,
      name: `Artist #${nextArtistIndex}`,
    });

    await this._WR.save(createdArtist);
    this._EB.publish(new ArtistCreatedEvent({ id: generatedId }));

    return generatedId;
  }

  async updateArtist(id: string, payload: UpdateArtistPayload): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException(`Artist does not exist`);
    }

    if (payload.name) {
      foundArtist.updateName(payload.name);
    }

    if (payload.birthName) {
      foundArtist.updateBirthName(payload.birthName);
    }

    if (payload.birthDate !== undefined) {
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

    await this._WR.save(foundArtist);
    this._EB.publish(new ArtistUpdatedEvent({ id: foundArtist.getId() }));

    return foundArtist.getId();
  }

  async updateArtistAvatar(id: string, payload: UpdateArtistAvatarPayload): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    if (payload.fileId) {
      const tmpFile = await this._tmpFS.findById(payload.fileId);

      if (!tmpFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._artistFS.saveArtistAvatar(foundArtist.getId(), tmpFile);

      foundArtist.updateAvatar(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundArtist.updateAccentColor(payload.color);
    }

    await this._WR.save(foundArtist);
    this._EB.publish(new ArtistUpdatedEvent({ id: foundArtist.getId() }));

    return foundArtist.getId();
  }

  async deleteArtistAvatar(id: string): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteAvatar();

    await this._WR.save(foundArtist);
    await this._artistFS.deleteArtistAvatar(foundArtist.getId());
    this._EB.publish(new ArtistUpdatedEvent({ id: foundArtist.getId() }));

    return foundArtist.getId();
  }

  async updateArtistCover(id: string, payload: UpdateArtistCoverPayload): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    if (payload.fileId) {
      const tmpFile = await this._tmpFS.findById(payload.fileId);

      if (!tmpFile) {
        throw new NotFoundException('File does not uploaded');
      }

      const storedFileData = await this._artistFS.saveArtistCover(foundArtist.getId(), tmpFile);

      foundArtist.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundArtist.updateSecondaryColor(payload.color);
    }

    await this._WR.save(foundArtist);
    this._EB.publish(new ArtistUpdatedEvent({ id: foundArtist.getId() }));

    return foundArtist.getId();
  }

  async deleteArtistCover(id: string): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteCover();
    await this._WR.save(foundArtist);
    await this._artistFS.deleteArtistCover(foundArtist.getId());
    this._EB.publish(new ArtistUpdatedEvent({ id: foundArtist.getId() }));

    return foundArtist.getId();
  }

  async deleteArtist(id: string): Promise<ArtistId> {
    const deletedArtistId = await this._WR.deleteById(id);

    if (!deletedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._artistFS.deleteArtistDirectory(deletedArtistId);
    this._EB.publish(new ArtistDeletedEvent({ id: deletedArtistId }));

    return deletedArtistId;
  }

  async getArtist(id: string, options?: Partial<{ isPublic: boolean }>): Promise<ArtistDTO | null> {
    const foundArtist = await this._RR.findById(id, options);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }

  async getArtistPublicStatus(id: string): Promise<boolean> {
    const foundArtist = await this._RR.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return foundArtist.isPublic;
  }

  async verifyArtistId(id: string): Promise<ArtistId | null> {
    return this._WR.existsById(id);
  }

  async verifyArtistIds(ids: string[]): Promise<{
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    return this._WR.existsByIds(ids);
  }
}
