import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AlbumService } from '@core/app/components/album/album.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { GetArtistAlbumsQuery } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';
import { GetArtistAlbumsHandler as CoreGetArtistAlbumsHandler } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.handler';

@QueryHandler(GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler extends CoreGetArtistAlbumsHandler {
  constructor(
    @Inject(ArtistService) artistService: ArtistService,
    @Inject(AlbumService) albumService: AlbumService,
  ) {
    super(artistService, albumService);
  }
}
