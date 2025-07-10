import { QueryHandler } from '@nestjs/cqrs';
import { GetArtistAlbumsQuery } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';
import { GetArtistAlbumsHandler as CoreGetArtistAlbumsHandler } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.handler';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { AlbumService } from '@core/app/components/album/services/album.service';

@QueryHandler(GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler extends CoreGetArtistAlbumsHandler {
  constructor(artistVerifyService: ArtistVerifyService, albumService: AlbumService) {
    super(artistVerifyService, albumService);
  }
}
