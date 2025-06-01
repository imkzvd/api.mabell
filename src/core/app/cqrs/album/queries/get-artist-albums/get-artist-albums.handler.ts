import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistAlbumsQuery } from './get-artist-albums.query';
import { AlbumService } from '../../../../components/album/album.service';

@QueryHandler(GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler implements IQueryHandler<GetArtistAlbumsQuery> {
  constructor(@Inject(AlbumService) private readonly _albumService: AlbumService) {}

  async execute({ artistId, options }: GetArtistAlbumsQuery) {
    return await this._albumService.getAlbumsByArtistId(artistId, options);
  }
}
