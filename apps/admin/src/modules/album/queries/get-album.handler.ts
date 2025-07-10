import { QueryHandler } from '@nestjs/cqrs';
import { GetAlbumQuery } from '@core/app/cqrs/album/queries/get-album/get-album.query';
import { GetAlbumHandler as CoreGetAlbumHandler } from '@core/app/cqrs/album/queries/get-album/get-album.handler';
import { AlbumService } from '@core/app/components/album/services/album.service';

@QueryHandler(GetAlbumQuery)
export class GetAlbumHandler extends CoreGetAlbumHandler {
  constructor(service: AlbumService) {
    super(service);
  }
}
