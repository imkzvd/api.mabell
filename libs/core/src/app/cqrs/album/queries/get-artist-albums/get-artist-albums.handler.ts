import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistAlbumsQuery } from './get-artist-albums.query';
import { AlbumService } from '../../../../components/album/album.service';
import { ArtistService } from '../../../../components/artist/artist.service';
import { NotFoundException } from '../../../../../shared/exceptions';

@QueryHandler(GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler implements IQueryHandler<GetArtistAlbumsQuery> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
  ) {}

  async execute({ artistId, options }: GetArtistAlbumsQuery) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._albumService.getAlbumsByArtistId(artistId, options);
  }
}
