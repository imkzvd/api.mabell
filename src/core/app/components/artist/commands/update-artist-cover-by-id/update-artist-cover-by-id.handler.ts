import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../../upload/storage/tmp-file-storage.port';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../ports/storage/artist-file-storage.port';
import { BadRequestException, NotFoundException } from '../../../../../shared/exceptions';
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
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id, payload }: UpdateArtistCoverByIdCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    const tmpFileData = await this._tmpFileStorage.findById(payload.fileId);

    if (!tmpFileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    const storedFileData = await this._artistFileStorage.saveCover(
      foundArtist.getId(),
      tmpFileData,
    );
    await this._tmpFileStorage.deleteById(tmpFileData.id);

    foundArtist.updateCover(storedFileData.path);

    if (payload.secondaryColor !== undefined) {
      foundArtist.updateSecondaryColor(payload.secondaryColor);
    }

    return this._artistWriteRepository.save(foundArtist);
  }
}
