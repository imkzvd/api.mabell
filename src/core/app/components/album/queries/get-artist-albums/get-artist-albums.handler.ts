import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistAlbumsQuery } from './get-artist-albums.query';
import {
  ALBUM_READ_REPOSITORY_DI_TOKEN,
  AlbumReadRepository,
} from '../../ports/repository/album-read-repository.port';
import AlbumMapper from '../dtos/album.mapper';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../../artist/ports/repository/artist-read-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';

@QueryHandler(GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler implements IQueryHandler<GetArtistAlbumsQuery> {
  constructor(
    @Inject(ALBUM_READ_REPOSITORY_DI_TOKEN)
    private readonly _albumReadRepository: AlbumReadRepository,
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
  ) {}

  async execute({ artistId, options }: GetArtistAlbumsQuery) {
    if (options?.isPublic) {
      const isPublicArtist = await this._artistReadRepository.getPublicStatus(artistId);

      if (!isPublicArtist) {
        throw new NotFoundException('Artist not found');
      }
    }

    const foundAlbums = await this._albumReadRepository.findByArtistId(artistId, {
      isPublic: options?.isPublic,
      pagination: options?.pagination,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundAlbums.items.map((album) => AlbumMapper.toDTO(album)),
      foundAlbums.total,
      foundAlbums.limit,
      foundAlbums.offset,
      foundAlbums.hasMore,
    );
  }
}
