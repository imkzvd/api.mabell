import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AlbumService } from '@core/app/components/album/album.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { GetArtistAlbumsQuery } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';
import { GetArtistAlbumsHandler as CoreGetArtistAlbumsHandler } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.handler';

@QueryHandler(GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler implements IQueryHandler<GetArtistAlbumsQuery> {
  private readonly coreHandler: CoreGetArtistAlbumsHandler;

  constructor(
    @Inject(ArtistService) artistService: ArtistService,
    @Inject(AlbumService) albumService: AlbumService,
  ) {
    this.coreHandler = new CoreGetArtistAlbumsHandler(artistService, albumService);
  }

  async execute(query: GetArtistAlbumsQuery) {
    return this.coreHandler.execute(query);
  }
}
