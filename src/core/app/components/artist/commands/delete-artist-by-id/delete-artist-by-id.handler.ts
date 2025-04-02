import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../ports/storage/artist-file-storage.port';
import { DeleteArtistByIdCommand } from './delete-artist-by-id.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(DeleteArtistByIdCommand)
export class DeleteArtistByIdHandler implements ICommandHandler<DeleteArtistByIdCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id }: DeleteArtistByIdCommand) {
    const deleteArtistId = await this._artistWriteRepository.deleteById(id);

    if (!deleteArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return this._artistFileStorage.deleteDirectory(deleteArtistId);
  }
}
