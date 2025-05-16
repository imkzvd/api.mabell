import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateAlbumCoverCommand } from './update-album-cover.command';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../../artist/ports/storage/artist-file-storage.port';

@CommandHandler(UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler implements ICommandHandler<UpdateAlbumCoverCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id, payload }: UpdateAlbumCoverCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException('Artist does not exist');
    }

    if (payload.fileId) {
      const storedFileData = await this._artistFileStorage.saveAlbumCover(
        foundAlbum.getMainArtist(),
        foundAlbum.getId(),
        payload.fileId,
      );

      foundAlbum.updateCover(storedFileData.path);
    }

    if (payload.color !== undefined) {
      foundAlbum.updateColor(payload.color);
    }

    return this._albumWriteRepository.save(foundAlbum);
  }
}
