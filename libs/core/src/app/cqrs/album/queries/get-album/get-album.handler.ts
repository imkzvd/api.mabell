import { QueryHandler } from '@core/app/types';
import { AlbumService } from '@core/app/components/album/album.service';
import { GetAlbumQuery } from '@core/app/cqrs/album/queries/get-album/get-album.query';
import AlbumMapper from '@core/app/components/album/dtos/album.mapper';

export class GetAlbumHandler implements QueryHandler<GetAlbumQuery> {
  constructor(private readonly _albumService: AlbumService) {}

  async execute({ id, options }: GetAlbumQuery) {
    const foundAlbum = await this._albumService.getAlbum(id, options);

    return foundAlbum ? AlbumMapper.toDTO(foundAlbum) : null;
  }
}
