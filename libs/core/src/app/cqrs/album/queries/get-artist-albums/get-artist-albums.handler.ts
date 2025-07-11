import { QueryHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { GetArtistAlbumsQuery } from '@core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { AlbumService } from '@core/app/components/album/services/album.service';

export class GetArtistAlbumsHandler implements QueryHandler<GetArtistAlbumsQuery> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _albumService: AlbumService,
  ) {}

  async execute({ artistId, options }: GetArtistAlbumsQuery) {
    const verifiedArtistId = await this._artistVerifyService.verify(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._albumService.findByArtistId(artistId, options);
  }
}
