import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../ports/storage/artist-file-storage.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateArtistAvatarByIdCommand } from './update-artist-avatar-by-id.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(UpdateArtistAvatarByIdCommand)
export class UpdateArtistAvatarByIdHandler
  implements ICommandHandler<UpdateArtistAvatarByIdCommand>
{
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id, payload }: UpdateArtistAvatarByIdCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    const storedFileData = await this._artistFileStorage.saveArtistAvatar(
      foundArtist.getId(),
      payload.fileId,
    );

    foundArtist.updateAvatar(storedFileData.path);

    if (payload.accentColor !== undefined) {
      foundArtist.updateAccentColor(payload.accentColor);
    }

    return this._artistWriteRepository.save(foundArtist);
  }
}
