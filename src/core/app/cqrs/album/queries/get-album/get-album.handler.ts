import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumQuery } from './get-album.query';
import { AlbumService } from '../../../../components/album/album.service';
import AlbumMapper from '../../../../components/album/dtos/album.mapper';

@QueryHandler(GetAlbumQuery)
export class GetAlbumHandler implements IQueryHandler<GetAlbumQuery> {
  constructor(@Inject(AlbumService) private readonly _albumService: AlbumService) {}

  async execute({ id, options }: GetAlbumQuery) {
    const foundAlbum = await this._albumService.getAlbum(id, options);

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }
}
