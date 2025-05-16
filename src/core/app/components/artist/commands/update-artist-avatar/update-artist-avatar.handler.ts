import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../ports/storage/artist-file-storage.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateArtistAvatarCommand } from './update-artist-avatar.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler implements ICommandHandler<UpdateArtistAvatarCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id, payload }: UpdateArtistAvatarCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    if (payload.fileId) {
      const storedFileData = await this._artistFileStorage.saveArtistAvatar(
        foundArtist.getId(),
        payload.fileId,
      );

      foundArtist.updateAvatar(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundArtist.updateAccentColor(payload.color);
    }

    return this._artistWriteRepository.save(foundArtist);
  }
}
