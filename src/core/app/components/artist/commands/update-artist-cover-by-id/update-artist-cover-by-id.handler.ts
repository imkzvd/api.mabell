import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../ports/storage/artist-file-storage.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';
import { UpdateArtistCoverByIdCommand } from './update-artist-cover-by-id.command';

@CommandHandler(UpdateArtistCoverByIdCommand)
export class UpdateArtistCoverByIdHandler implements ICommandHandler<UpdateArtistCoverByIdCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id, payload }: UpdateArtistCoverByIdCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    const storedFileData = await this._artistFileStorage.saveArtistCover(
      foundArtist.getId(),
      payload.fileId,
    );

    foundArtist.updateCover(storedFileData.path);

    if (payload.secondaryColor !== undefined) {
      foundArtist.updateSecondaryColor(payload.secondaryColor);
    }

    return this._artistWriteRepository.save(foundArtist);
  }
}
