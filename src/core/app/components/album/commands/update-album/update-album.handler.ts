import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateAlbumCommand } from './update-album.command';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';

@CommandHandler(UpdateAlbumCommand)
export class UpdateAlbumHandler implements ICommandHandler<UpdateAlbumCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateAlbumCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    if (payload.name) {
      foundAlbum.updateName(payload.name);
    }

    if (payload.type) {
      foundAlbum.updateType(payload.type);
    }

    if (payload.genres) {
      foundAlbum.updateGenres(payload.genres);
    }

    if (payload.description) {
      foundAlbum.updateDescription(payload.description);
    }

    if (payload.releaseAt) {
      foundAlbum.updateReleaseDate(payload.releaseAt);
    }

    if (typeof payload.isActive === 'boolean') {
      foundAlbum.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundAlbum.updatePublicStatus(payload.isPublic);
    }

    return this._albumWriteRepository.save(foundAlbum);
  }
}
