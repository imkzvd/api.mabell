import { NotFoundException } from '@core/shared/exceptions';
import { ArtistWriteRepository } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistUpdatedEvent } from '@core/app/common/events/artist-updated.event';
import { UpdateArtistAvatarPayload, UpdateArtistCoverPayload, UpdateArtistPayload } from '../types';

export class ArtistUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async update(id: string, payload: UpdateArtistPayload): Promise<ArtistId> {
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

  async updateAvatar(id: string, payload: UpdateArtistAvatarPayload): Promise<ArtistId> {
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

  async deleteAvatar(id: string): Promise<ArtistId> {
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

  async updateCover(id: string, payload: UpdateArtistCoverPayload): Promise<ArtistId> {
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

  async deleteCover(id: string): Promise<ArtistId> {
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
}
