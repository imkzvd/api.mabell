import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';
import { CreateAlbumCommand } from './create-album.command';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { AlbumFactory } from '../../../../../domain/components/album/album.factory';

@CommandHandler(CreateAlbumCommand)
export class CreateAlbumHandler implements ICommandHandler<CreateAlbumCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
  ) {}

  async execute({ artistId, name }: CreateAlbumCommand) {
    const existArtistId = await this._artistWriteRepository.existsById(artistId);

    if (!existArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    const generatedId = this._albumWriteRepository.generateId();
    const nextAlbumIndex = (await this._albumWriteRepository.getTotalCount()) + 1;
    const createdAlbum = AlbumFactory.create({
      id: generatedId,
      name: name || `Album #${nextAlbumIndex}`,
      artists: [existArtistId],
    });

    await this._albumWriteRepository.save(createdAlbum);

    return {
      id: createdAlbum.getId(),
    };
  }
}
