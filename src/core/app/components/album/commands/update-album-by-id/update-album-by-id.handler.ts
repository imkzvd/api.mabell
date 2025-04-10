import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateAlbumByIdCommand } from './update-album-by-id.command';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';

@CommandHandler(UpdateAlbumByIdCommand)
export class UpdateAlbumByIdHandler implements ICommandHandler<UpdateAlbumByIdCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateAlbumByIdCommand) {
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
