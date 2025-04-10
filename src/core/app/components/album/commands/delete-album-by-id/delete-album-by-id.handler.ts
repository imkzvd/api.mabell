import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { DeleteAlbumByIdCommand } from './delete-album-by-id.command';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../../artist/ports/storage/artist-file-storage.port';

@CommandHandler(DeleteAlbumByIdCommand)
export class DeleteAlbumByIdHandler implements ICommandHandler<DeleteAlbumByIdCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id }: DeleteAlbumByIdCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    await this._albumWriteRepository.deleteById(id);

    return this._artistFileStorage.deleteAlbumDirectory(
      foundAlbum.getMainArtist(),
      foundAlbum.getId(),
    );
  }
}
