import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { DeleteAlbumCoverByIdCommand } from './delete-album-cover-by-id.command';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../../artist/ports/storage/artist-file-storage.port';

@CommandHandler(DeleteAlbumCoverByIdCommand)
export class DeleteAlbumCoverByIdHandler implements ICommandHandler<DeleteAlbumCoverByIdCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id }: DeleteAlbumCoverByIdCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    foundAlbum.deleteCover();
    foundAlbum.deleteColor();

    await this._albumWriteRepository.save(foundAlbum);

    return this._artistFileStorage.deleteAlbumCover(foundAlbum.getMainArtist(), foundAlbum.getId());
  }
}
