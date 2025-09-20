import { QueryHandler } from '../../../../types';
import { GetArtistAlbumsQuery } from './get-artist-albums.query';
import { ArtistVerifyService } from '../../../../components/artist';
import { AlbumService } from '../../../../components/album';
import { NotFoundException } from '../../../../../shared/exceptions';

export class GetArtistAlbumsHandler implements QueryHandler<GetArtistAlbumsQuery> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _albumService: AlbumService,
  ) {}

  async execute({ artistId, options }: GetArtistAlbumsQuery) {
    const verifiedArtistId = await this._artistVerifyService.verifyById(
      artistId,
      options?.isPublic,
    );

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return this._albumService.findByArtistId(artistId, options);
  }
}
