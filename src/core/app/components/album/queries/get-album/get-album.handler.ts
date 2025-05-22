import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumQuery } from './get-album.query';
import AlbumMapper from '../dtos/album.mapper';
import {
  ALBUM_READ_REPOSITORY_DI_TOKEN,
  AlbumReadRepository,
} from '../../../../../domain/components/album/repository/album-read-repository.port';

@QueryHandler(GetAlbumQuery)
export class GetAlbumHandler implements IQueryHandler<GetAlbumQuery> {
  constructor(
    @Inject(ALBUM_READ_REPOSITORY_DI_TOKEN)
    private readonly _albumReadRepository: AlbumReadRepository,
  ) {}

  async execute({ id, isPublic }: GetAlbumQuery) {
    const foundAlbum = await this._albumReadRepository.findById(id, {
      isPublic,
    });

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }
}
