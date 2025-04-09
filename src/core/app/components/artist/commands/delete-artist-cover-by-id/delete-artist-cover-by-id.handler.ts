import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../ports/storage/artist-file-storage.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { DeleteArtistCoverByIdCommand } from './delete-artist-cover-by-id.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(DeleteArtistCoverByIdCommand)
export class DeleteArtistCoverByIdHandler implements ICommandHandler<DeleteArtistCoverByIdCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id }: DeleteArtistCoverByIdCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    foundArtist.deleteCover();
    foundArtist.deleteSecondaryColor();

    await this._artistWriteRepository.save(foundArtist);

    return this._artistFileStorage.deleteArtistCover(foundArtist.getId());
  }
}
