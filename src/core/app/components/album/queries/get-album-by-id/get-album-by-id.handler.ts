import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumByIdQuery } from './get-album-by-id.query';
import {
  ALBUM_READ_REPOSITORY_DI_TOKEN,
  AlbumReadRepository,
} from '../../ports/repository/album-read-repository.port';
import AlbumMapper from '../dtos/album.mapper';

@QueryHandler(GetAlbumByIdQuery)
export class GetAlbumByIdHandler implements IQueryHandler<GetAlbumByIdQuery> {
  constructor(
    @Inject(ALBUM_READ_REPOSITORY_DI_TOKEN)
    private readonly _albumReadRepository: AlbumReadRepository,
  ) {}

  async execute({ id }: GetAlbumByIdQuery) {
    const foundAlbum = await this._albumReadRepository.findById(id, true);

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }
}
