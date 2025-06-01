import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistQuery } from './get-artist.query';
import { ArtistService } from '../../../../components/artist/artist.service';
import ArtistMapper from '../../../../components/artist/dtos/artist.mapper';

@QueryHandler(GetArtistQuery)
export class GetArtistHandler implements IQueryHandler<GetArtistQuery> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id, options }: GetArtistQuery) {
    const foundArtist = await this._artistService.getArtist(id, options);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }
}
