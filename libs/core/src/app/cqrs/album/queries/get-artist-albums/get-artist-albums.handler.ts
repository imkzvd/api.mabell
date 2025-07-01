import { QueryHandler } from '@core/app/types';
import { AlbumService } from '@core/app/components/album/album.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { NotFoundException } from '@core/shared/exceptions';
import { GetArtistAlbumsQuery } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';

export class GetArtistAlbumsHandler implements QueryHandler<GetArtistAlbumsQuery> {
  constructor(
    private readonly _artistService: ArtistService,
    private readonly _albumService: AlbumService,
  ) {}

  async execute({ artistId, options }: GetArtistAlbumsQuery) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._albumService.getAlbumsByArtistId(artistId, options);
  }
}
