import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumQuery } from '@core/app/cqrs/album/queries/get-album/get-album.query';
import { GetAlbumHandler as CoreGetAlbumHandler } from '@core/app/cqrs/album/queries/get-album/get-album.handler';
import { AlbumService } from '@core/app/components/album/album.service';

@QueryHandler(GetAlbumQuery)
export class GetAlbumHandler extends CoreGetAlbumHandler {
  constructor(@Inject(AlbumService) service: AlbumService) {
    super(service);
  }
}
