import { UpdateArtistAvatarPayload, UpdateArtistCoverPayload, UpdateArtistPayload } from '../types';
import { ArtistWriteRepository } from '../../../../domain/components/artist';
import { NotFoundException } from '../../../../shared/exceptions';
import { ArtistFileStorage, EventBus, TmpFileStorage } from '../../../ports';
import { ArtistId } from '../../../../domain/components/artist/types';
import { ArtistUpdatedEvent } from '../../../events';
import { prepareArtistEventPayload } from '../utils/prepare-artist-event-payload.utility';

export class ArtistUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: ArtistWriteRepository,
    private readonly _tmpFS: TmpFileStorage,
    private readonly _artistFS: ArtistFileStorage,
  ) {}

  async updateById(artistId: string, payload: UpdateArtistPayload): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(artistId);

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

    this._EB.publish(new ArtistUpdatedEvent(prepareArtistEventPayload(foundArtist)));

    return foundArtist.getId();
  }

  async updateAvatarById(artistId: string, payload: UpdateArtistAvatarPayload): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(artistId);

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

    this._EB.publish(new ArtistUpdatedEvent(prepareArtistEventPayload(foundArtist)));

    return foundArtist.getId();
  }

  async deleteAvatarById(artistId: string): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(artistId);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteAvatar();

    await this._WR.save(foundArtist);
    await this._artistFS.deleteArtistAvatar(foundArtist.getId());

    this._EB.publish(new ArtistUpdatedEvent(prepareArtistEventPayload(foundArtist)));

    return foundArtist.getId();
  }

  async updateCoverById(artistId: string, payload: UpdateArtistCoverPayload): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(artistId);

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

    this._EB.publish(new ArtistUpdatedEvent(prepareArtistEventPayload(foundArtist)));

    return foundArtist.getId();
  }

  async deleteCoverById(artistId: string): Promise<ArtistId> {
    const foundArtist = await this._WR.findById(artistId);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteCover();
    await this._WR.save(foundArtist);
    await this._artistFS.deleteArtistCover(foundArtist.getId());

    this._EB.publish(new ArtistUpdatedEvent(prepareArtistEventPayload(foundArtist)));

    return foundArtist.getId();
  }
}
